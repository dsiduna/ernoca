import React from 'react'
import logo from '../../assets/logo-small.png'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { updatePublicModal, viewCar } from '../../redux/actions/modals'

function Congratulations({ closeModal = () => { } }) {
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(updatePublicModal({}));
        dispatch(viewCar({}));
        closeModal();
    }
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center justify-center w-full w-3/4'>
                <Image
                    src={logo}
                    alt=''
                    width={48}
                    height={48}
                    className=''
                />
                <div className='text-[24px] font-semibold pt-2'>
                    Congratulations!
                </div>
                <div className='w-full pt-2 text-[14px]'>
                    Details have been successfully saved.
                    We'll get back to you.
                </div>
                <div className='rounded-xl bg-[#201c78] hover:bg-[#464686] text-white text-center px-4 py-2 mt-8 w-1/2 cursor-pointer'
                    onClick={onClose}
                >
                    Close
                </div>
            </div>
        </div>
    )
}

export default Congratulations