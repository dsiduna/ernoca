'use client'

import React from 'react'
import { useGetSingleCarQuery } from '../redux/services/carsService'
import { useParams } from 'next/navigation'

const ProductDisplay = () => {
  const params = useParams();
  const { data: productData, isLoading: isGetProductLoading } = useGetSingleCarQuery(params.id);
  return (
    <div className='p-24'>Here we go again</div>
  )
}

export default ProductDisplay