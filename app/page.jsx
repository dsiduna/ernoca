'use client'
import FilterComponent from '../app/components/FilterComponent'

// Import Swiper styles
import ItemCard from './components/ItemCard';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./redux/actions/cars";
import { useGetCarsQuery } from './redux/services/carsService';
import { useGetAccessoriesQuery } from './redux/services/accessoriesService';


export default function Home() {

  const { data: cars, isLoading: isGetCarsLoading, refetch: refetchCars } = useGetCarsQuery();
  const { data: accessories, isLoading: isGetAccessoriesLoading, refetch: refetchAssessories } = useGetAccessoriesQuery();
  const dispatch = useDispatch();


  const productList = useSelector((state) => state?.cars?.value);


  useEffect(() => {
    if (cars) {
      dispatch(fetchProduct(cars));
    }
  }, [dispatch, cars]);

  return (
    <div className="flex flex-col">
      <FilterComponent />

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 sm:m-10">
        {productList?.map((e) => (
          <ItemCard key={e.id} {...e} />
        ))}
      </div>
    </div>
  );
}
