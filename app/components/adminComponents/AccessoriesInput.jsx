'use client'

import React from 'react';
import InputField from '../InputField';
import CategoryPicker from '../CategoryPicker';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { sparePartsCategories } from '../../utils/sparePartsCategories'

const AccessoriesInput = ({
    accessoryData,
    errors,
    setAccessoryData = () => { },
    setErrors = () => { },
    setIsValid = () => { },
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccessoryData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        handleClearErrors();
    };

    const handleCategoryChange = (e) => {
        setAccessoryData((prevState) => ({
            ...prevState,
            category: e.target.value,
        }))
    }

    const handlePhoneChange = (phone) => {
        setAccessoryData((prevState) => ({
            ...prevState,
            phone: phone,
        }))
    }

    const handleClearErrors = () => {
        setIsValid(true);
        setErrors({
            name: '',
            price: '',
            specs: '',
        })
    }
    return (
        <div>
            <div className='flex justify-center items-center gap-2 w-full p-2 pt-52'>
                <InputField
                    label="Product Name"
                    id="name"
                    name="name"
                    value={accessoryData.name}
                    onChange={handleChange}
                    error={errors.make}
                />

            </div>
            <div className='flex justify-center items-center gap-2 w-full p-2'>
                <CategoryPicker
                    selectedCategory={accessoryData.category}
                    categories={sparePartsCategories}
                    onChange={handleCategoryChange}
                />
                <div className='w-full'>
                    <InputField
                        label="Price"
                        id="price"
                        name="price"
                        value={accessoryData.price}
                        onChange={handleChange}
                        error={errors.price}
                        type='number'
                    />
                </div>
            </div>
            <div className="p-2 w-full">
                <label htmlFor="description" className="text-md font-medium">
                    Produc Specs:
                </label>
                <textarea
                    id="specs"
                    name="specs"
                    value={accessoryData.specs}
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
                    value={accessoryData.phone}
                    onChange={phone => handlePhoneChange(phone)}
                />
            </div>
        </div>
    );
}


export default AccessoriesInput;



