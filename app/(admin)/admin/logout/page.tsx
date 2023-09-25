'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function Logout() {
    const router = useRouter()
    const onCancel = () => {
        router.back()
    }
    const onLogout = () => {
        router.push('/')
    }
    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='rounded-2xl p-4 shadow-2xl'>
                <div className='text-xl font-medium px-2 pt-[20px]'>
                    Are you sure you want to logout?
                </div>
                <div className='w-full flex gap-4 items-center justify-evenly pt-[40px] pb-[20px]'>
                    <button onClick={onLogout} className='w-full bg-[#ff0000] hover:bg-[#ed7014] text-white rounded-2xl py-2'>
                        Yes, Logout
                    </button>
                    <button onClick={onCancel} className='w-full bg-gray-700 hover:bg-gray-900 text-white rounded-2xl py-2'>
                        No, Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Logout