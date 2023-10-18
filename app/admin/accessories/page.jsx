'use client'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from '../../components/Searchbar'
import FilterDropdown from "../../components/FilterDropDown";
import AdminModalHOC from '../../components/modals/AdminModalHOC';
import { updateModal } from "../../redux/actions/modals";
import { useGetAccessoriesQuery } from "../../redux/services/accessoriesService";
import AccessoryCard from '../../components/adminComponents/AccessoryCard'
import CarCardLoading from '../../components/adminComponents/CarCardLoading';
import { sparePartsCategories } from "../../utils/sparePartsCategories";

const Accessories = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.data);

  const { data: accessories, isLoading: isGetAccessoriesLoading, refetch: refetchAssessories } = useGetAccessoriesQuery();

  const onAddAccessoryClick = () => {
    dispatch(updateModal('Add Accessory'));
    setOpen(true);
  }

  const skeletonPulses = Array.from({ length: 2 })

  useEffect(() => {
    if (modal === 'Congratulations') {
      refetchAssessories();
    }
  }, [modal]);

  return (
    <>
      <AdminModalHOC
        open={open}
        setOpen={setOpen}
      />
      <div className="w-full min-h-screen">
        <div className='p-8 text-[32px] text-center font-semibold'>
          Accessories
        </div>
        <div className='grid grid-cols-3 gap-4 pt-[20px]'>
          <div className='col-span-2 w-full'>
            <SearchBar
              onSearch={() => { }}
            />
          </div>
          <div>
            <FilterDropdown
              options={sparePartsCategories}
              onSelect={() => { }}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-12 gap-2 items-center justify-center'>
          <div className="h-300px bg-white shadow-xl rounded-xl flex flex-col items-center justify-center  max-w-[300px] p-8 h-48"
            onClick={onAddAccessoryClick}
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
              New Accessory
            </div>
          </div>
          {isGetAccessoriesLoading ? (
            <React.Fragment>
              {skeletonPulses.map((_, index) => (
                <CarCardLoading key={index} />
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {accessories?.map((accessory) => (
                <AccessoryCard
                  accessory={accessory}
                  setOpen={setOpen}
                />
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  )
}

export default Accessories;


