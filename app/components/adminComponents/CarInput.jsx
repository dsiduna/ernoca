'use client'

import React from 'react';
import InputField from '../InputField';
import YearPicker from '../YearPicker';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const CarInput = ({
    carData,
    isValid = true,
    errors,
    setCarData = () => { },
    setErrors = () => { },
    setIsValid = () => { },
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        handleClearErrors();
    };

    const handleYearChange = (e) => {
        setCarData((prevState) => ({
            ...prevState,
            year: e.target.value,
        }))
    }

    const handlePhoneChange = (phone) => {
        setCarData((prevState) => ({
            ...prevState,
            phone: phone,
        }))
    }

    const handleClearErrors = () => {
        setIsValid(true);
        setErrors({
            make: '',
            model: '',
            price: '',
            colour: '',
            description: '',
        })
    }

    return (
        <div>
            <div className='flex justify-center items-center gap-2 w-full p-2 pt-52'>
                <InputField
                    label="Make"
                    id="make"
                    name="make"
                    value={carData.make}
                    onChange={handleChange}
                    error={errors.make}
                />
                <InputField
                    label="Model"
                    id="model"
                    name="model"
                    value={carData.model}
                    onChange={handleChange}
                    error={errors.model}
                />
            </div>
            <div className='flex justify-center items-center gap-2 w-full p-2'>
                <InputField
                    label="Colour"
                    id="colour"
                    name="colour"
                    value={carData.colour}
                    onChange={handleChange}
                    error={errors.colour}
                />
                <InputField
                    label="Mileage"
                    id="mileage"
                    name="mileage"
                    value={carData.mileage}
                    onChange={handleChange}
                    error={errors.mileage}
                    type='number'
                    inputMode='numeric'
                    
                />
            </div>
            <div className='flex justify-center items-center gap-2 w-full p-2'>
                <YearPicker
                    selectedYear={carData.year}
                    onChange={handleYearChange}
                />
                <InputField
                    label="Price"
                    id="price"
                    name="price"
                    value={carData.price}
                    onChange={handleChange}
                    error={errors.price}
                    type='number'
                />
            </div>
            <div className="p-2 w-full">
                <label htmlFor="description" className="text-md font-medium">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={carData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
            </div>
            <div className='p-2 w-full gap-2'>
                <label htmlFor="phone" className="text-md font-medium">
                    Seller WhatsApp No:
                </label>

                <PhoneInput
                    inputStyle={{ width: '100%', marginBlock: '2px' }}
                    country={'zw'}
                    value={carData.phone}
                    onChange={phone => handlePhoneChange(phone)}
                />
            </div>
        </div>
    );
}


export default CarInput;



