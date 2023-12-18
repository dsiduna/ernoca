'use client'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminModalHOC from '../../components/modals/AdminModalHOC';
import CarCard from "../../components/adminComponents/CarCard";
import CarCardLoading from '../../components/adminComponents/CarCardLoading';
import { useGetPendingCarsQuery } from "../../redux/services/pendingService";

const ForApprovals = () => {
    const [open, setOpen] = useState(false);
    const modal = useSelector((state) => state.modal.data);

    const {
        data: pendingCars,
        isLoading: isGetPendingCarsLoading,
        isError: IsGetPendingCarsError,
        refetch: refetchPendingCars
    } = useGetPendingCarsQuery();


    const skeletonPulses = Array.from({ length: 2 })

    useEffect(() => {
        if (modal === 'Congratulations') {
            refetchPendingCars()
        }
    }, [modal])
    return (
        <>
            <AdminModalHOC
                open={open}
                setOpen={setOpen}
            />
            <div className="w-full min-h-screen">
                <div className='p-8 text-[32px] text-center font-semibold'>
                    Pending Approval
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8 gap-2 items-center justify-center'>

                    {isGetPendingCarsLoading ? (
                        <React.Fragment>
                            {skeletonPulses.map((_, index) => (
                                <CarCardLoading key={index} />
                            ))}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {pendingCars?.map((car) => (
                                <CarCard
                                    setOpen={setOpen}
                                    car={car}
                                    modal='View Pending Car'
                                />
                            ))}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </>
    )
}

export default ForApprovals


