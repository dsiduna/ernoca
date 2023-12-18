import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useApprovePendingCarMutation } from '../../redux/services/pendingService';
import { updateModal } from '../../redux/actions/modals';
import loader from '../../assets/loading.gif';

const ApproveItem = ({ closeModal = () => { } }) => {
    const { id, name = '', make, model } = useSelector((state) => state.modal.car);
    const dispatch = useDispatch();
    const [approvePendingCar, { isLoading: isLoadingApproveCar, isError: isErrorApproveCar }] = useApprovePendingCarMutation();
    console.log(name);

    const handleApproveCar = async () => {
        await approvePendingCar(id).then(() => {
            dispatch(updateModal("Congratulations"));
        })
    }
    const carTitle = make + ' ' + model
    return (
        <div className='flex flex-col items-center'>
            <div className='text-lg font-semibold w-2/3 text-center pt-8'>
                Are you sure you want to approve {name !== '' ? name : carTitle} ?
            </div>
            <div>
                {isLoadingApproveCar ? (
                    <Image
                        src={loader}
                        alt=''
                        width={48}
                        height={48}
                    />
                ) : (
                    <div className="flex justify-around items-center pt-8 gap-4">

                        <div className="rounded-xl bg-[#201c78] hover:bg-[#464686] text-white text-center px-8 py-2 cursor-pointer"
                            onClick={handleApproveCar}
                        >
                            Yes, Approve
                        </div>
                        <div className="rounded-xl bg-[#ff0000] hover:bg-[#ff000090] text-white text-lg px-8 text-center py-2 cursor-pointer"
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

export default ApproveItem