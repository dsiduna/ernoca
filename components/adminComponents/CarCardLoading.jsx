import React from 'react'

const CarCardLoading = () => {
    return (
        <div className='flex flex-wrap justify-center items-center'>
            <div className='container mx-auto px-4 mt-16'>
                <div className='animate-pulse relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg'>
                    <div className='h-[220px] bg-gray-200 rounded-xl'></div>
                    <div className='px-6 py-6'>
                        <div className='h-4 bg-gray-200 rounded'></div>
                        <div className='h-4 mt-2 bg-gray-200 rounded'></div>
                        <div className='h-4 mt-2 bg-gray-200 rounded'></div>
                        <div className='h-4 mt-2 bg-gray-200 rounded'></div>
                    </div>
                    <div className='h-10 bg-gray-200 rounded-b-lg'></div>
                </div>
            </div>
        </div>
    )
}

export default CarCardLoading