'use client'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from '../../components/Searchbar'
import FilterDropdown from "../../components/FilterDropDown";
import AdminModalHOC from '../../components/modals/AdminModalHOC';
import { updateModal } from "../../redux/actions/modals";
import { useGetCarsQuery } from "../../redux/services/carsService";
import CarCard from "../../components/adminComponents/CarCard";

const Cars = () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { data: cars, isLoading: isGetCarsLoading } = useGetCarsQuery();




  const onAddCarClick = () => {
    dispatch(updateModal('Add Car'));
    setOpen(true);
  }

  return (
    <>
      <AdminModalHOC
        open={open}
        setOpen={setOpen}
      />
      <div className="w-full">
        <div className='p-8 text-[32px] text-center font-semibold'>
          Cars
        </div>
        <div className='grid grid-cols-3 gap-4 pt-[20px]'>
          <div className='col-span-2 w-full'>
            <SearchBar
              onSearch={() => { }}
            />
          </div>
          <div>
            <FilterDropdown
              options={options}
              onSelect={() => { }}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-[20px] gap-2 items-center justify-center'>
          <div className="h-300px bg-white shadow-xl rounded-xl flex flex-col items-center justify-center  max-w-[300px] p-8 h-48"
            onClick={onAddCarClick}
          >
            <svg
              className="w-12 h-12 text-gray-500 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <div className='text-green-500 font-medium text-xl cursor-pointer' >
              Add New Car
            </div>
          </div>
          {cars?.map((car) => (
            <CarCard
              setOpen={setOpen}
              car={car}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Cars


