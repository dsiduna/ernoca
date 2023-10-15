import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';

export const ViewCar = () => {
    const car = useSelector((state) => state.modal.car)
    const dispatch = useDispatch();
    const settings = {
        dots: true,
        infinite: true,
        //speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    console.log(car);
    return (
        <div>
            <Slider {...settings}>
                {car.images.map((image) => (
                    <div>
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
    )
}
