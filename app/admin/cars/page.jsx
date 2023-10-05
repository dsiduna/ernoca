'use client'
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from '../../components/Searchbar'
import FilterDropdown from "../../components/FilterDropDown";
import AddCar from "../../components/adminComponents/AddCar";
import Modal from '../../components/Modal';
import { useAddCarMutation } from "../../redux/services/carsService";


const Cars = () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [addCar, { isLoading: isAddCarLoading }] = useAddCarMutation();
  const [openAddCarModal, setOpenAddCarModal] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    specs: '',
    price: 0,
    category: '',
    images: [],
  });
  return (
    <>
      <Modal
        open={openAddCarModal}
        setOpen={setOpenAddCarModal}
        size='w-[600px] h-[548px]'
        content={
          <AddCar
            closemodal={() => setOpenAddCarModal(false)}
            addCar={addCar}
            isAddCarLoading={isAddCarLoading}
          />
        }
        title="Add Car"
      />
      <div>
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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-[20px] gap-2'>
          <div className="h-300px bg-white shadow-xl rounded-xl flex flex-col items-center justify-center  max-w-[300px] py-8"
            onClick={() => setOpenAddCarModal(true)}
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
        </div>
      </div>
    </>
  )
}

export default Cars


