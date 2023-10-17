import React from 'react'
import { useSelector } from 'react-redux'

const DeleteItem = ({ closeModal = () => { } }) => {
  const car = useSelector((state) => state.modal.car)
  return (
    <div className='flex flex-col items-center'>
      <div className='text-lg font-semibold w-2/3 text-center pt-8'>
        Are you sure you want to delete {car.make} {car.model} ?
      </div>
      <div className="flex justify-around items-center pt-8 gap-4">
        <div className="rounded-xl bg-[#ff0000] hover:bg-[#ff000090] text-white text-lg px-8 text-center py-2 cursor-pointer"
          onClick={() => { }}
        >
          Yes, Delete
        </div>
        <div className="rounded-xl bg-[#201c78] hover:bg-[#464686] text-white text-center px-8 py-2 cursor-pointer"
          onClick={closeModal}
        >
          No, Cancel
        </div>
      </div>
    </div>
  )
}

export default DeleteItem