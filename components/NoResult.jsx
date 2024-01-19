import React from 'react'
import Image from 'next/image'
import no_result from '../assets/no_result.png'
import GoBack from '../components/GoBack'

function NoResult() {
    return (
        <div className='py-8'>
            <div className='flex flex-col justify-center items-center'>
                <Image
                    src={no_result}
                    alt=''
                    height={600}
                    width={400}
                />
            </div>
            <GoBack />
        </div>
    )
}

export default NoResult