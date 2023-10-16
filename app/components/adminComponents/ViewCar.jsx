'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { updateModal } from '../../redux/actions/modals';

const ViewCar = () => {
    const car = useSelector((state) => state.modal.car);
    const dispatch = useDispatch();

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="pt-4 flex flex-col justify-center items-center">
            <div>
                <div className="text-center text-xl font-semibold">
                    {car.make} {car.model} ({car.year})
                </div>
                <div className="pt-4 max-w-[300px]">
                    <Slider {...settings}>
                        {car.images.map((image, index) => (
                            <div key={index} className='flex flex-col justify-center items-center w-full h-[200px]'>
                                <Image
                                    src={image}
                                    alt=""
                                    height={200}
                                    width={300}
                                    className="h-[200px] rounded-xl flex flex-col justify-center items-center"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="flex justify-around items-center pt-8 gap-4">
                <div className="rounded-xl bg-[#201c78] hover:bg-[#464686] text-white text-center w-[108px] py-1 w-1/2 cursor-pointer"
                    onClick={() => dispatch(updateModal('Edit Item'))}
                >
                    Edit
                </div>
                <div className="rounded-xl bg-[#ff0000] hover:bg-[#ff000090] text-white text-center w-[108px] py-1 w-1/2 cursor-pointer"
                    onClick={() => dispatch(updateModal('Delete Item'))}
                >
                    Delete
                </div>
            </div>
        </div>
    );
};

export default ViewCar;