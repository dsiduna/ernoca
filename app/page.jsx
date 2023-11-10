'use client'
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import FilterComponent from '../app/components/FilterComponent'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ItemCard from './components/ItemCard';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./redux/actions/cars";
import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const banner = [
  "https://m.media-amazon.com/images/I/6124QhAPExL._SX1500_.jpg",
  "https://m.media-amazon.com/images/I/71NCXxTGJCL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/710xff6TncL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71cac9idZML._SX3000_.jpg",
];

function SlideNextButton() {
  const swiper = useSwiper();

  console.log("d");

  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
}
/*export const getServerSideProps: GetServerSideProps<{ data: any }> = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return { props: { data } };
};*/

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
