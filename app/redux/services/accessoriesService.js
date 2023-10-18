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
                    name: accessory.name,
                    category: accessory.category,
                    specs: accessory.specs,
                    price: accessory.price,
                    phone: accessory.phone,
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
                    return { data: 'Accessory successfully added' }
                } catch (error) {
                    console.error('Error adding product:', error);
                    return error
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
        getAccessories: builder.query({
            async queryFn() {
                const accessoriesRef = collection(db, 'accessories');
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
        getSingleAccessory: builder.mutation({
            async queryFn(id) {
                const accessoryRef = doc(db, 'accessories', id)
                try {
                    await getDoc(accessoryRef)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateAccessory: builder.mutation({
            async queryFn(accessory) {
                const imagesToBeUploaded = accessory?.pictures?.filter((item) => typeof item !== 'string');
                const unDeletedImages = accessory.pictures?.filter((item) => typeof item === 'string');
                const accessoryData = {
                    name: accessory.name,
                    category: accessory.category,
                    specs: accessory.specs,
                    price: accessory.price,
                    phone: accessory.phone,
                    images: unDeletedImages,
                };

                try {
                    const accessoryRef = doc(collection(db, 'accessories'));
                    const storage = getStorage();
                    const storageRef = ref(storage);
                    for (let i = 0; i < imagesToBeUploaded.length; i++) {
                        const image = imagesToBeUploaded[i];
                        const imageRef = ref(storageRef, `${car.id}/${image.name}`);
                        await uploadBytes(imageRef, image);
                        const imageUrl = await getDownloadURL(imageRef);
                        carData.images.push(imageUrl);
                    }
                    await updateDoc(accessoryRef, accessoryData);
                    console.log('Product updated successfully!');
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            }
        })
    })
})

export const {
    useAddAccessoryMutation,
    useDeleteAccessoryMutation,
    useGetAccessoriesQuery,
    useGetSingleAccessoryMutation,
    useUpdateAccessoryMutation,
} = accessoriesService;


