
import React from 'react'
import { db } from '../../firebase'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import ProductDisplay from './ProductDisplay';
import SuggestedCars from '../../components/SuggestedCars'
import { useParams } from 'next/navigation';

export async function generateStaticParams() {
    const carsRef = collection(db, 'cars');
    const accessoriesRef = collection(db, 'accessories');

    const carsSnapshot = await getDocs(carsRef);
    const accessoriesSnapshot = await getDocs(accessoriesRef);
    const cars = carsSnapshot.docs.map((doc) => ({ id: doc.id }));
    const accessories = accessoriesSnapshot.docs.map((doc) => ({ id: doc.id }));

    const Arr = [...cars, ...accessories]

    return Arr.map((item) => ({
        id: item.id,
    }))
}

export async function generateMetadata({ params, searchParams }, parent) {
    const id = params.id
    let productData;
    const carRef = doc(db, 'cars', id);
    const accessoryRef = doc(db, 'accessories', id);

    const carSnapshot = await getDoc(carRef);
    const accessorySnapshot = await getDoc(accessoryRef);

    if (carSnapshot.exists()) {
        productData = carSnapshot.data();
    } else {
        productData = accessorySnapshot.data();
    }


    const previousImages = parent.openGraph?.images || []

    const {
        name = '',
        make = '',
        model = '',
        description = '',
        images = [],
    } = productData || {};
    return {
        title: name === '' ? (make + ' ' + model) : name,
        description: description.slice(0, 95) + '...',
        openGraph: {
            images: [images[0], ...previousImages],
        },
    }
}

const Product = ({ params, searchParams }) => {

    return (
        <>
            <ProductDisplay params={params} />
            <SuggestedCars />
        </>
    )
}

export default Product