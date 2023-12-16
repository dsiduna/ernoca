'use client'

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePublicModal } from '../redux/actions/modals';
import PublicModalHOC from '../components/modals/PublicModalsHOC'


const Seller = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleVehicleSelect = () => {
        dispatch(updatePublicModal('Enlist Car'));
        setOpen(true);
    };

    const handleSparesSelect = () => {
        dispatch(updatePublicModal('Enlist Accessory'));
        setOpen(true);
    }
    return (
        <>
            <PublicModalHOC
                open={open}
                setOpen={setOpen}
            />
            <div className='pt-24 min-h-page flex flex-col items-center w-full'>
                <div className='pt-8 text-[32px] font-bold'>
                    What Are You Selling Today?
                </div>
                <div className='w-1/4 pt-4 italic text-lg text-center'>
                    we'll help to connect you with your target market.
                    Please click on one of the options to continue.
                </div>
                <div className='flex justify-evenly items-center w-full py-12'>
                    <div className='rounded-xl bg-[#201c78] hover:bg-[#464686] text-white text-[24px] text-center px-4 py-1 cursor-pointer'
                        onClick={handleVehicleSelect}
                    >
                        Vehicle
                    </div>
                    <div className='rounded-xl /*bg-[#201c78] hover:bg-[#464686]*/ bg-slate-400 text-white text-[24px] text-center px-4 py-1 cursor-pointer'
                        /*onClick={handleSparesSelect}*/
                        onClick={() => { }}
                    >
                        Spares
                    </div>
                </div>
            </div>
        </>
    )
}

export default Seller