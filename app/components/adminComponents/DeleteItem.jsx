import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useDeleteCarMutation } from '../../redux/services/carsService';
import { updateModal } from '../../redux/actions/modals';
import loader from '../../assets/loading.gif';

const DeleteItem = ({ closeModal = () => { } }) => {
  const { id, make, model } = useSelector((state) => state.modal.car);
  const dispatch = useDispatch();
  const [deleteCar, { isLoading: isDeleteCarLoading }] = useDeleteCarMutation();
  const handleDeleteCar = async () => {
    try {
      await deleteCar(id).then(() => {
        dispatch(updateModal("Congratulations"));
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center'>
      <div className='text-lg font-semibold w-2/3 text-center pt-8'>
        Are you sure you want to delete {make} {model} ?
      </div>
      <div>
        {isDeleteCarLoading ? (
          <Image
            src={loader}
            alt=''
            width={48}
            height={48}
          />
        ) : (
          <div className="flex justify-around items-center pt-8 gap-4">
            <div className="rounded-xl bg-[#ff0000] hover:bg-[#ff000090] text-white text-lg px-8 text-center py-2 cursor-pointer"
              onClick={handleDeleteCar}
            >
              Yes, Delete
            </div>
            <div className="rounded-xl bg-[#201c78] hover:bg-[#464686] text-white text-center px-8 py-2 cursor-pointer"
              onClick={closeModal}
            >
              No, Cancel
            </div>
          </div>
        )}
      </div>
    </div >
  )
}

export default DeleteItem