import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    collection,
    doc,
    deleteDoc,
    getDocs,
    setDoc,
    getDoc,
    updateDoc,
    query,
    where,
} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../../firebase";

export const carsService = createApi({
    baseQuery: fakeBaseQuery(),
    reducerPath: 'carsService',
    endpoints: (builder) => ({
        addCar: builder.mutation({
            async queryFn(car) {
                const carData = {
                    make: car.make.trim().toLowerCase(),
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
                    const carRef = doc(collection(db, "cars"));
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
        deleteCar: builder.mutation({
            async queryFn(id) {
                const carRef = doc(db, 'cars', id)
                console.log('Product deleted successfully!');
                try {
                    await deleteDoc(carRef)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getCars: builder.query({
            async queryFn() {
                const carsRef = collection(db, 'cars');
                try {
                    const snapshot = await getDocs(carsRef);
                    const cars = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    return { data: cars };
                } catch (error) {
                    console.log(error);
                    throw new Error(error.message);
                }
            },
        }),
        searchCars: builder.mutation({
            async queryFn(resultsIDs) {
                const carsRef = collection(db, 'cars')

                try {
                    const q = query(carsRef, where(firebase.firestore.FieldPath.documentId(), "in", resultsIDs));
                    const querySnapshot = await getDocs(q);

                    const cars = [];
                    querySnapshot.forEach((doc) => {
                        const dataWithId = { id: doc.id, ...doc.data() };
                        cars.push(dataWithId);
                    });
                    return { data: cars };

                } catch (error) {
                    console.log(error);
                    throw new Error(error.message);
                }
            }
        }),
        getSingleCar: builder.query({
            async queryFn(id) {
                const carRef = doc(db, 'cars', id)
                const accessoriesRef = doc(db, 'accessories', id)
                try {
                    const snapshot = await getDoc(carRef);
                    const accessorySnapshot = await getDoc(accessoriesRef);
                    let product;
                    if (snapshot.exists()) {
                        product = snapshot.data();
                    } else {
                        product = accessorySnapshot.data()
                    }
                    return { data: product }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getSuggestedCars: builder.query({
            async queryFn(data) {
                const carsRef = collection(db, 'cars')
                console.log(data)
                try {
                    const cars = [];
                    const minPrice = data.price - 2500;
                    const maxPrice = data.price + 2500;
                    console.log(data.id);

                    //cars of same make
                    const q1 = query(carsRef, where('make', '==', data.make.toLowerCase()));
                    const snapshot1 = await getDocs(q1);
                    const carsOfSameMake = snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter((item) => item.id !== data.id);

                    //cars of same price range
                    const q2 = query(carsRef, where('price', '<=', Number(maxPrice)), where('price', '>=', Number(minPrice)))
                    const snapshot2 = await getDocs(q2);
                    const carsOfSamePriceRange = snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    console.log(carsOfSameMake)
                    console.log(carsOfSamePriceRange)
                    if (carsOfSameMake.length >= 4) {
                        cars.push(...carsOfSameMake.slice(0, 4));
                    } else {
                        cars.push(...carsOfSameMake);
                        const remainingSlots = 4 - carsOfSameMake.length;
                        cars.push(...carsOfSamePriceRange.slice(0, remainingSlots));
                    }

                    return { data: cars }
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        }),
        updateCar: builder.mutation({
            async queryFn(car) {
                const imagesToBeUploaded = car?.pictures?.filter((item) => typeof item !== 'string');
                const unDeletedImages = car.pictures?.filter((item) => typeof item === 'string');
                const carData = {
                    make: car.make,
                    model: car.model,
                    description: car.description,
                    price: car.price,
                    images: unDeletedImages,
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
                    const carRef = doc(db, "cars", car.id);
                    const storage = getStorage();
                    const storageRef = ref(storage, "carImages");
                    console.log(imagesToBeUploaded);
                    for (let i = 0; i < imagesToBeUploaded.length; i++) {
                        const image = imagesToBeUploaded[i];
                        const imageRef = ref(storageRef, `${car.id}/${image.name}`);
                        await uploadBytes(imageRef, image);
                        const imageUrl = await getDownloadURL(imageRef);
                        carData.images.push(imageUrl);
                    }
                    await updateDoc(carRef, carData);
                    console.log('Product updated successfully!');
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            }
        })
    })
})

export const {
    useAddCarMutation,
    useDeleteCarMutation,
    useGetCarsQuery,
    useGetSingleCarQuery,
    useUpdateCarMutation,
    useSearchCarsMutation,
    useGetSuggestedCarsQuery,
} = carsService;
