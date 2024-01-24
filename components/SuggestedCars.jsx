'use client'
import React from 'react'
import { useGetSuggestedCarsQuery } from '../redux/services/carsService'
import ItemCard from './ItemCard'
import { ItemLoadingCard } from './ItemCard'

const skeletonPulses = Array.from({ length: 4 })
const SuggestedCars = ({ make, price, id }) => {
  const searchParams = {
    make: make,
    price: price,
    id: id,
  };
  const {
    data: suggestedCars,
    isLoading: isGetSuggestedcarsLoading,
    isError,
  } = useGetSuggestedCarsQuery(searchParams)
  return (
    <div className='pt-0 p-24 xs:px-2 xs:py-4 sm:px-2 sm:py-4 md:p-4'>
      <div className='lg:text-2xl text-xl font-bold leading-12 pb-4'>
        Cars You Might Also Like
      </div>
      <div>
        {isGetSuggestedcarsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 sm:m-10">
            {skeletonPulses.map((_, index) => (
              <ItemLoadingCard key={index} />
            ))}
          </div>
        ) : (
          <React.Fragment>
            {(suggestedCars.length > 0 || !isError) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 sm:m-10">
                {suggestedCars?.map((e) => (
                  <ItemCard key={e.id} {...e} />
                ))}
              </div>
            ) :
              <NoResult />
            }
          </React.Fragment>
        )}

      </div>
    </div>
  )
}

export default SuggestedCars

