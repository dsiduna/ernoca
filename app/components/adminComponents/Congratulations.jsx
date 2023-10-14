import React from 'react'
import logo from '../../assets/logo-small.png'
import Image from 'next/image'

function Congratulations({ closeModal = () => { } }) {
    return (
        <div>
            <Image
                src={logo}
                alt=''
                width={24}
                height={24}
                className='pt-12'
            />
            <div>
                Congratulations!
            </div>
            <div>
                The record has been saved
            </div>
            <div>
                close
            </div>
        </div>
    )
}

export default Congratulations