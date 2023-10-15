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

export const accessoriesService = createApi({
    reducerPath: 'carsService',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        addAccessory: builder.mutation({
            async queryFn(accessory) {
                const accessoryData = {
                    /*make: car.make,
                    model: car.model,
                    description: car.description,
                    price: car.price,
                    year: car.year,
                    colour: car.colour,
                    phone: car.phone,
                    mileage: car.mileage,*/
                    images: [],
                };
                try {
                    const accessoryRef = doc(collection(db, 'accessories'));
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
                    console.log('Product added successfully!');
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            }
        }),
        deleteAccessory: builder.mutation({
            async queryFn(id) {
                const accessoryRef = doc(db, 'accessories', id)
                try {
                    await deleteDoc(accessoryRef)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getAccessories: builder.mutation({
            async queryFn() {
                const accessoriesRef = collection(db, 'accessories');
                try {
                    const snapshot = await getDocs(accessoriesRef);
                    const accessories = snapshot.docs.map((doc) => doc.data());
                    return { data: accessories };
                } catch (error) {
                    console.log(error);
                    return { error: error.message };
                }
            }
        }),
        getSingleAccessory: builder.mutation({
            async queryFn(id) {
                const accessoryRef = doc(db, 'accessories', id)
                try {
                    await getDoc(accessoryRef)
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {
    useAddAccessoryMutation,
    useDeleteAccessoryMutation,
    useGetAccessoriesMutation,
    useGetSingleAccessoryMutation,
} = accessoriesService;
