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

import { db } from "@/firebase";

export const carsService = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['cars'],
    endpoints: (builder) => ({
        addCar: builder.mutation({
            async queryFn(car) {
                const carData = {
                    title: car.title,
                    description: car.description,
                    price: car.price,
                    category: car.category,
                    specs: car.specs,
                    images: []
                };
                try {
                    const carRef = doc(collection(db, "cars"));
                    const storage = getStorage();
                    const storageRef = ref(storage);

                    for (let i = 0; i < car.images.length; i++) {
                        const image = car.images[i];
                        const imageRef = ref(storageRef, `carImages/${carRef.id}/${image.name}`);
                        await uploadBytes(imageRef, image);
                        const imageUrl = await getDownloadURL(imageRef);
                        carData.images.push(imageUrl);
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
                const carRef = doc(db, 'cars')
                try {
                    await getDocs(carRef)
                } catch (error) {
                    console.log(error)
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
