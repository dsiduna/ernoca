'use client'

import React from 'react';
import InputField from '../InputField';
import YearPicker from '../YearPicker';
import { CitySuggestInput } from '../FilterComponent';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { conditions, transmission, fuel } from '../../utils/conditions';
import { towns } from '../../utils/towns';

const CarInput = ({
    carData,
    isValid = true,
    errors,
    setCarData = () => { },
    setErrors = () => { },
    setIsValid = () => { },
    setLocation = () => { }
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
            <div className='flex justify-center items-center gap-2 w-full p-2 pt-96'>
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
            <div className='flex justify-center items-center gap-2 w-full p-2'>
                <div className='w-full gap-1 flex flex-col'>
                    <label htmlFor='location' className="text-md font-medium text-start">
                        Car Location:
                    </label>
                    <CitySuggestInput
                        towns={towns}
                        setLocation={setLocation}
                    />
                </div>
                <div className='w-full gap-1 flex flex-col'>
                    <label className="text-md font-medium text-start">
                        Condition:
                    </label>
                    <select
                        id="condition"
                        name="condition"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={carData.condition}
                        onChange={handleChange}
                    >
                        {conditions.map((condition, index) => (
                            <option key={index} value={condition}>
                                {condition}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='flex justify-center items-center gap-2 w-full p-2'>
                <div className='w-full gap-1 flex flex-col'>
                    <label className="text-md font-medium text-start">
                        Fuel:
                    </label>
                    <select
                        id="fuel"
                        name="fuel"
                        className="border border-gray-300 rounded p-2"
                        value={carData.fuel}
                        onChange={handleChange}
                    >
                        {fuel.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='w-full gap-1 flex flex-col'>
                    <label className="text-md font-medium text-start">
                        Transmission:
                    </label>
                    <select
                        id="transmission"
                        name="transmission"
                        className="border border-gray-300 rounded p-2"
                        value={carData.transmission}
                        onChange={handleChange}
                    >
                        {transmission.map((mode, index) => (
                            <option key={index} value={mode}>
                                {mode}
                            </option>
                        ))}
                    </select>
                </div>
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



