
import React from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore';
import ProductDisplay from './ProductDisplay';
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

const Product = () => {
    
    return (
        <ProductDisplay />
    )
}

export default Product