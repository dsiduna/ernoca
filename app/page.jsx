'use client'
import FilterComponent from '../app/components/FilterComponent'

// Import Swiper styles
import ItemCard from './components/ItemCard';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./redux/actions/cars";
import Image from "next/image";


export default function Home() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const loadData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const response = await res.json();
    setData(response);
    console.log('we here')
  };
  useEffect(() => {
    loadData();
  }, []);

  const productList = useSelector((state) => state?.cars?.value);
  console.log(productList);

  useEffect(() => {
    if (data) {
      dispatch(fetchProduct(data.products));
    }
  }, [dispatch, data]);

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
