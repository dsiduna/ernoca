import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    collection,
    doc,
    deleteDoc,
    getDocs,
    setDoc,
    getDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../../../firebase";

export const pendingService = createApi({
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        addPendingCar: builder.mutation({
            async queryFn(car) {
                const carData = {
                    make: car.make,
                    model: car.model,
                    description: car.description,
                    price: car.price,
                    images: [],
                    year: car.year,
                    colour: car.colour,
                    phone: car.phone,
                    mileage: car.mileage,
                    condition: car.condition,
                    location: car.location,
                    fuel: car.fuel,
                    transmission: car.transmission,
                };
                try {
                    const carRef = doc(collection(db, 'pendingCars'));
                    const storage = getStorage();
                    const storageRef = ref(storage);

                    for (let i = 0; i < car.pictures.length; i++) {
                        const image = car.pictures[i];
                        const imageRef = ref(storageRef, `carImages/${carRef.id}/${image.name}`);
                        await uploadBytes(imageRef, image);
                        const imageUrl = await getDownloadURL(imageRef);
                        carData.images.push(imageUrl);
                        console.log("here" + i)
                    }
                    await setDoc(carRef, carData);
                    console.log('Product added successfully!');
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            }
        }),
        deletePendingCar: builder.mutation({
            async queryFn(id) {
                const carRef = doc(db, 'pendingCars', id)
                console.log('Product deleted successfully!');
                try {
                    await deleteDoc(carRef)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getPendingCars: builder.query({
            async queryFn() {
                const carsRef = collection(db, 'pendingCars');
                try {
                    const snapshot = await getDocs(carsRef);
                    const cars = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    console.log(cars);
                    return { data: cars };
                } catch (error) {
                    console.log(error);
                    throw new Error(error.message);
                }
            },
        }),
        approvePendingCar: builder.mutation({
            async queryFn(id) {
                try {
                    // Retrieve the pending car data
                    const pendingCarRef = doc(db, 'pendingCars', id);
                    const pendingCarSnapshot = await getDoc(pendingCarRef);
                    const pendingCarData = pendingCarSnapshot.data();

                    // Add the pending car to the 'cars' collection
                    const carRef = doc(collection(db, 'cars'));
                    await setDoc(carRef, pendingCarData);

                    // Delete the pending car record
                    await deleteDoc(pendingCarRef);

                    console.log('Pending car approved and moved to cars collection.');

                    return pendingCarData;
                } catch (error) {
                    console.error('Error approving pending car:', error);
                    throw error;
                }
            },
        }),
        addPendingAccessory: builder.mutation({
            async queryFn(accessory) {
                const accessoryData = {
                    name: accessory.name,
                    category: accessory.category,
                    specs: accessory.specs,
                    price: accessory.price,
                    phone: accessory.phone,
                    images: [],
                };
                try {
                    const accessoryRef = doc(collection(db, 'pendingAccessories'));
                    const storage = getStorage();
                    const storageRef = ref(storage);

                    for (let i = 0; i < accessory.pictures.length; i++) {
                        const image = accessory.pictures[i];
                        const imageRef = ref(storageRef, `accessoryImages/${accessoryRef.id}/${image.name}`);
                        await uploadBytes(imageRef, image);
                        const imageUrl = await getDownloadURL(imageRef);
                        accessoryData.images.push(imageUrl);
                    }
                    await setDoc(accessoryRef, accessoryData);
                    return { data: 'Accessory successfully added' }
                } catch (error) {
                    console.error('Error adding product:', error);
                    return error
                }
            }
        }),
        deletePendingAccessory: builder.mutation({
            async queryFn(id) {
                const accessoryRef = doc(db, 'pendingAccessories', id)
                try {
                    await deleteDoc(accessoryRef)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getPendingAccessories: builder.query({
            async queryFn() {
                const accessoriesRef = collection(db, 'pendingAccessories');
                try {
                    const snapshot = await getDocs(accessoriesRef);
                    const accessories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    return { data: accessories };
                } catch (error) {
                    console.log(error);
                    return { error: error.message };
                }
            }
        }),
        approvePendingAccessory: builder.mutation({
            async queryFn(id) {
                try {
                    // Retrieve the pending accessory data
                    const pendingAccessoryRef = doc(db, 'pendingAccessories', id);
                    const pendingAccessorySnapshot = await getDoc(pendingAccessoryRef);
                    const pendingAccessoryData = pendingAccessorySnapshot.data();

                    // Add the pending accessory to the 'accessories' collection
                    const carRef = doc(collection(db, 'accessories'));
                    await setDoc(carRef, pendingAccessoryData);

                    // Delete the pending car record
                    await deleteDoc(pendingAccessoryRef);

                    console.log('Pending car approved and moved to cars collection.');

                    return pendingAccessoryData;
                } catch (error) {
                    console.error('Error approving pending car:', error);
                    throw error;
                }
            },
        }),
    })
})

export const {
    useAddPendingCarMutation,
    useDeletePendingCarMutation,
    useGetPendingCarsQuery,
    useApprovePendingCarMutation,
    useAddPendingAccessoryMutation,
    useDeletePendingAccessoryMutation,
    useGetPendingAccessoriesQuery,
    useApprovePendingAccessoryMutation,
} = pendingService;
