'use client'

import React, { useState, useEffect } from 'react'
import { useGetSingleCarQuery } from '../../redux/services/carsService'
import { formatCurrency } from '../../utils/formatCurrency'
import Image from 'next/image'
import Link from 'next/link'

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
    phone = '',
    location = '',
    mileage = '',
    fuel = '',
    year = '',
    transmission = ''
  } = productData || {};
  console.log(productData)

  const [currentImage, setCurrentImage] = useState(images[0])

  useEffect(() => {
    if (images) {
      setCurrentImage(images[0])
    }
  }, [images]);

  return (
    <div className='p-24 xs:px-2 xs:py-4 sm:px-2 sm:py-4 md:p-4'>
      {isGetProductLoading ? (
        <LoadingSkeleton />
      ) : (
        <section className="overflow-hidden bg-gray-50 rounded-xl py-11 font-poppins">
          <div className="lg:max-w-6xl px-0 py-4 mx-auto xs:mx-0 sm:mx-0 lg:py-8 md:px-0">
            <div className="flex justify-center items-center xs:flex-col w-full">
              <div className="w-full px-4">
                <div className="sticky top-0 z-50 overflow-hidden ">
                  <div className="relative mb-6 lg:mb-10 h-[360px]">
                    <Image src={currentImage}
                      alt=""
                      className="object-cover rounded-xl"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <div className="p-2" key={index} onClick={(e) => { setCurrentImage(images[index]); e.preventDefault() }}>
                        <a href="#"
                          className="block border border-transparent">
                          <Image
                            src={image}
                            alt=""
                            className={`object-cover w-full h-20 w-40 ${index === 0 && 'rounded-l-lg'} ${index === (images?.length - 1) && 'rounded-r-lg'}`}
                            width={20}
                            height={20}
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
                    <h2 className="max-w-xl text-2xl font-bold md:text-4xl">
                      {name === '' ? make + ' ' + model : name}
                    </h2>
                    <p className="inline-block mt-4 text-3xl font-bold text-slate-500">
                      <span>{formatCurrency(price)}</span>
                    </p>
                    {location !== '' &&
                      <div className="flex items-center justify-start text-slate-400 pt-2 gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          width={18}
                          height={18}
                          color='#94a3b8'
                        >
                          <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"
                          />
                        </svg>
                        <span className="text-sm text-slate-400">

                          {location}
                        </span>
                      </div>
                    }
                    <div className='py-4'>
                      <div className='flex justify-start items-center gap-2'>
                        <span className='font-semibold text-sm'>Fuel :</span>
                        <span className='text-sm italic'>{fuel} </span>
                      </div>
                      <div className='flex justify-start items-center gap-2'>
                        <span className='font-semibold text-sm'>Transmission :</span>
                        <span className='text-sm italic'>{transmission} </span>
                      </div>
                      <div className='flex justify-start items-center gap-2'>
                        <span className='font-semibold text-sm'>Mileage :</span>
                        <span className='text-sm italic'>{mileage} km</span>
                      </div>
                      <div className='flex justify-start items-center gap-2'>
                        <span className='font-semibold text-sm'>Manufactured :</span>
                        <span className='text-sm italic'>{year} </span>
                      </div>
                      {colour !== '' &&
                        <div className='flex justify-start items-center gap-2'>
                          <span className='font-semibold text-sm'>Colour :</span>
                          <span className='text-sm italic'>{colour} </span>
                        </div>
                      }
                      <span className="text-sm font-medium text-rose-500 ">{condition}</span>
                    </div>


                    <p className="max-w-md mb-8 text-gray-700 text-sm whitespace-pre">
                      {description}
                    </p>
                  </div>

                  {category !== '' &&
                    <div className="flex items-center mb-8">
                      <h2 className="w-16 text-xl font-bold ">
                        Category:</h2>
                      <div className="flex flex-wrap ml-12">
                        {category}
                      </div>
                    </div>
                  }
                  <div className='flex justify-start items-center gap-2 pb-4'>
                    <span className='font-semibold text-lg'>Seller:</span>
                    <span>
                      +{phone}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center -mx-4 ">
                    <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                    <Link href={`https://wa.me/${phone}`} target='_blank'
                        className="flex items-center justify-center w-full gap-2 p-4 rounded-xl border border-gray-900 bg-white hover:bg-gray-100"
                      >
                        Contact Seller <span><svg fill="#25D366" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308 308" stroke="#25D366">
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier"> <g id="XMLID_468_"> <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path> </g> </g>
                        </svg> </span>
                      </Link>
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
    <div className="flex justify-center items-center min-h-screen w-full">
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
