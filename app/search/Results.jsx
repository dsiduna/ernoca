import React from 'react'
import NoResult from '../../components/NoResult'
import { ItemLoadingCard } from '../../components/ItemCard'
import ItemCard from '../../components/ItemCard'

const skeletonPulses = Array.from({ length: 4 })
const Results = ({ data = [], isLoading = false, isError = false }) => {
  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 sm:m-10">
          {skeletonPulses.map((_, index) => (
            <ItemLoadingCard key={index} />
          ))}
        </div>
      ) : (
        <React.Fragment>
          {(data.length > 0 || !isError) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 sm:m-10">
              {data?.map((e) => (
                <ItemCard key={e.id} {...e} />
              ))}
            </div>
          ) :
            <NoResult />
          }
        </React.Fragment>
      )}

    </div>
  )
}

export default Results