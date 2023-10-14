import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    arrayUnion,
    collection,
    doc,
    deleteDoc,
    getDocs,
    setDoc,
    getDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../../../firebase";

export const carsService = createApi({
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        addCar: builder.mutation({
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
                try {
                    await deleteDoc(carRef)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getCars: builder.mutation({
            async queryFn() {
                const carsRef = collection(db, 'cars');
                try {
                    const snapshot = await getDocs(carsRef);
                    const cars = snapshot.docs.map((doc) => doc.data());
                    return { data: cars };
                } catch (error) {
                    console.log(error);
                    return { error: error.message };
                }
            }
        }),
        getSingleCar: builder.mutation({
            async queryFn(id) {
                const carRef = doc(db, 'cars', id)
                try {
                    await getDoc(carRef)
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {
    useAddCarMutation,
    useDeleteCarMutation,
    useGetCarsMutation,
    useGetSingleCarMutation
} = carsService;
