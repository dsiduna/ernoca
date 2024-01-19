import React from 'react'
import { useRouter } from 'next/navigation'

function GoBack() {
    const router = useRouter()
    return (
        <div className='pt-8 flex flex-col items-end'>
            <div className='py-2 px-4 text-right  cursor-pointer rounded-xl bg-[#201c78] hover:bg-[#464686] text-white'
                onClick={() => router.back()}
            >
                Back to Previous Page
            </div>
        </div>
    )
}

export default GoBack