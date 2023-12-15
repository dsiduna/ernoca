'use client'
import FilterComponent from '../app/components/FilterComponent';
import ItemCard, { ItemLoadingCard } from './components/ItemCard';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./redux/actions/cars";
import { useGetCarsQuery } from './redux/services/carsService';
import { useGetAccessoriesQuery } from './redux/services/accessoriesService';


export default function Home() {

  const { data: cars, isLoading: isGetCarsLoading, refetch: refetchCars } = useGetCarsQuery();
  const { data: accessories, isLoading: isGetAccessoriesLoading, refetch: refetchAssessories } = useGetAccessoriesQuery();
  const dispatch = useDispatch();
  const [makes, setMakes] = useState([]);


  const productList = useSelector((state) => state?.cars?.value);
  const skeletonPulses = Array.from({ length: 4 })


  useEffect(() => {
    if (cars) {
      dispatch(fetchProduct(cars));
      const carMakes = [...new Set(cars?.map(car => car.make.trim().toLowerCase()))];
      setMakes(carMakes);
    }
  }, [cars]);

  const filterCars = (cars) => {
    dispatch(fetchProduct(cars));
  }
  const resetCars = () => {
    dispatch(fetchProduct(cars));
  }
  return (
    <div className="flex flex-col pt-24">
      <FilterComponent
        cars={cars}
        makes={makes}
        onFilter={filterCars}
        onReset={resetCars}
      />

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 sm:m-10">
        {isGetCarsLoading ? (
          <React.Fragment>
            {skeletonPulses.map((_, index) => (
              <ItemLoadingCard key={index} />
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {productList?.map((e) => (
              <ItemCard key={e.id} {...e} />
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
