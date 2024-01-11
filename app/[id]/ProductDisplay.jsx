'use client'

import React, { useState, useEffect } from 'react'
import { useGetSingleCarQuery } from '../../redux/services/carsService'
import { formatCurrency } from '../../utils/formatCurrency'

const ProductDisplay = ({ params, searchParams }) => {
  const { data: productData, isLoading: isGetProductLoading } = useGetSingleCarQuery(params.id);
  console.log(productData)

  const {
    name = '',
    make = '',
    model = '',
    description = '',
    condition = '',
    images = [],
    price = 0,
    colour = '',
    category = '',
  } = productData || {};

  const [currentImage, setCurrentImage] = useState(images[0])

  useEffect(() => {
    if (images) {
      setCurrentImage(images[0])
    }
  }, [images]);

  return (
    <div className='p-24'>
      {isGetProductLoading ? (
        <LoadingSkeleton />
      ) : (
        <section className="overflow-hidden bg-gray-50 rounded-xl py-11 font-poppins">
          <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4 md:w-1/2 ">
                <div className="sticky top-0 z-50 overflow-hidden ">
                  <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                    <img src={currentImage}
                      alt=""
                      className="object-cover w-full lg:h-full "
                    />
                  </div>
                  <div className="flex-wrap hidden md:flex ">
                    {images.map((image, index) => (
                      <div className="w-1/2 p-2 sm:w-1/4" key={index} onClick={() => setCurrentImage(images[index])}>
                        <a href="#"
                          className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                          <img src={image}
                            alt=""
                            className="object-cover w-full lg:h-20"
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 ">
                <div className="lg:pl-20">
                  <div className="mb-8 ">
                    <span className="text-lg font-medium text-rose-500 ">{condition}</span>
                    <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold md:text-4xl">
                      {name === '' ? make + ' ' + model : name}
                    </h2>

                    <p className="max-w-md mb-8 text-gray-700 whitespace-pre">
                      {description}
                    </p>
                    <p className="inline-block mb-8 text-4xl font-bold text-gray-700">
                      <span>{formatCurrency(price)}</span>
                    </p>
                    <p className="text-green-600 dark:text-green-300 ">7 in stock</p>
                  </div>
                  {colour !== '' &&
                    <div className="flex items-center mb-8">
                      <h2 className="w-16 mr-6 text-xl font-bold      ">
                        Color:</h2>
                      <div className="flex flex-wrap -mx-2 -mb-2">
                        {colour}
                      </div>
                    </div>
                  }
                  {category !== '' &&
                    <div className="flex items-center mb-8">
                      <h2 className="w-16 text-xl font-bold ">
                        Category:</h2>
                      <div className="flex flex-wrap ml-12">
                        {category}
                      </div>
                    </div>
                  }
                  <div className="flex flex-wrap items-center -mx-4 ">
                    <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                      <button
                        className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                        onClick={() => { }}
                      >
                        Make an Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >
      )}
    </div >
  )
}

export default ProductDisplay



const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse max-w-6xl px-4 py-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 md:w-1/2">
            <div className="h-80 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-8">
                <div className="h-6 bg-gray-200 rounded-md"></div>
                <div className="h-8 mt-2 mb-6 bg-gray-200 rounded-md"></div>
                <div className="h-20 mb-8 bg-gray-200 rounded-md"></div>
                <div className="h-16 mb-8 bg-gray-200 rounded-md"></div>
              </div>
              <div className="flex items-center mb-8">
                <div className="h-6 bg-gray-200 rounded-md"></div>
              </div>
              <div className="flex items-center mb-8">
                <div className="h-6 bg-gray-200 rounded-md"></div>
              </div>
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                  <div className="h-12 bg-blue-500 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
