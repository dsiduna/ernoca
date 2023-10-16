import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { viewCar, updateModal } from '../../redux/actions/modals';



const CarCard = ({ car, setOpen = () => { } }) => {
    const dispatch = useDispatch();
    const settings = {
        dots: true,
        infinite: true,
        //speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const onView = () => {
        dispatch(viewCar(car));
        dispatch(updateModal('View Car'))
        setOpen(true);
    }
    return (
        <div>
            <div className='flex flex-wrap justify-center items-center'>
                <div className='container mx-auto px-4 mt-16'>
                    <div className='relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg'>
                        <div className='px-6 flex flex-col'>
                        </div>
                        <div className='pb-12'>
                            <Slider {...settings}>
                                {car.images.map((image, index) => (
                                    <div key={index}>
                                        <Image
                                            src={image}
                                            alt=''
                                            height={200}
                                            width={300}
                                            className='h-[220px] rounded-xl'
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className='text-center text-[#7f2d00] font-semibold text-[18px]'>
                            {car.make + ' '} {car.model}
                        </div>
                        <div className='text-center text-[#7f2d00] text-[14px]'>
                            $ {car.price} <br /> <span className='italic'>Mnf year: <span className='font-semibold text-[#000000] italic text-[12px]'>{car.year}</span></span>
                        </div>
                        <div className='px-2 text-center py-4'>
                            Seller: +{car.phone}
                        </div>
                        <div className='flex justify-center items-center pb-4'>
                            <div
                                className='rounded-xl bg-[#201c78] hover:bg-[#464686] text-white text-center px-4 py-1 w-1/2 cursor-pointer'
                                onClick={onView}
                            >
                                Details
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CarCard
