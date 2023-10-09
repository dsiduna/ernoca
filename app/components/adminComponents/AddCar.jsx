'use client'

import React, { useState, useRef } from 'react';
import addIcon from '../../assets/add.svg';
import InputField from '../InputField';
import Image from 'next/image';
import YearPicker from '../YearPicker';

const AddCar = ({
    addCar = () => { },
    isAddCarLoading = false,
    closemodal = () => { },
}) => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        colour: '',
        description: '',
        mileage: 0,
        pictures: [],
    });

    const [errors, setErrors] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        colour: '',
        description: '',
        mileage: '',
    });

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear the error message when the input value changes
        }));
    };

    const handleYearChange = (e) => {
        setCarData((prevState) => ({
            ...prevState,
            year: e.target.value,
        }))
    }

    const handleAddPictureClick = () => {
        fileInputRef.current.click();
    };

    console.log(carData);

    const handlePictureUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + carData.pictures.length > 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                pictures: 'Cannot upload more than 10 pictures',
            }));
            return;
        }

        const pictureUrls = files.map((file) => URL.createObjectURL(file));
        setCarData((prevState) => ({
            ...prevState,
            pictures: prevState.pictures.concat(pictureUrls),
        }));

        // Reset the file input value after uploading
        fileInputRef.current.value = null;
        setErrors((prevErrors) => ({
            ...prevErrors,
            pictures: '', // Clear the error message after successful upload
        }));
    };

    const handleAddCar = async () => {
        try {
            // Perform input validation before submitting
            if (!validateInputs()) {
                return;
            }

            addCar(carData);
            closemodal();
        } catch (error) {
            console.log(error);
            closemodal();
        }
    };

    const handleRemovePicture = (index) => {
        const arr = [...carData.pictures]
        arr.splice(index, 1);
        setCarData((prevState) => ({
            ...prevState,
            pictures: arr
        }));
    };

    const validateInputs = () => {
        let isValid = true;
        const newErrors = {
            make: '',
            model: '',
            year: '',
            price: '',
            colour: '',
            description: '',
            mileage: '',
        };

        // Perform validation for each input field
        if (carData.make.trim() === '') {
            newErrors.make = 'Make is required';
            isValid = false;
        }

        if (carData.model.trim() === '') {
            newErrors.model = 'Model is required';
            isValid = false;
        }

        if (carData.year.trim() === '') {
            newErrors.year = 'Manufacture Year is required';
            isValid = false;
        } else if (!/^\d{4}$/.test(carData.year)) {
            newErrors.year = 'Invalid Manufacture Year';
            isValid = false;
        }

        if (carData.price.trim() === '') {
            newErrors.price = 'Price is required';
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test(carData.price)) {
            newErrors.price = 'Invalid Price';
            isValid = false;
        }

        if (carData.colour.trim() === '') {
            newErrors.colour = 'Colour is required';
            isValid = false;
        }

        if (carData.mileage.trim() === '') {
            newErrors.mileage = 'Mileage is required';
            isValid = false;
        } else if (!/^\d+$/.test(carData.mileage)) {
            newErrors.mileage = 'Invalid Mileage';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className="container mx-auto overflow-hidden">
            <form onSubmit={handleAddCar}>
                <div className="flex flex-col justify-center items-center w-full h-[400px] overflow-y-auto">
                    <div className='flex justify-center items-center gap-2 w-full p-2 pt-32'>
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
                    <div className="p-2 w-full">
                        <label htmlFor="pictures" className="text-md font-medium">
                            Pictures:
                        </label>
                        <div className='flex items-center justify-start gap-2 mt-2'>
                            <div className="flex justify-center items-center h-20 w-20 ">
                                <label htmlFor="pictures" className="text-lg font-medium cursor-pointer">
                                    <Image
                                        src={addIcon}
                                        alt=""
                                        className="w-8 h-8 mr-2"
                                        onClick={() => handleAddPictureClick()}
                                    />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePictureUpload}
                                    ref={fileInputRef}
                                    className="hidden"
                                />
                            </div>
                            {carData.pictures.map((pictureUrl, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={pictureUrl}
                                        alt={`Car Picture ${index + 1}`}
                                        className="h-20 w-20 object-cover mr-2 rounded"
                                    />
                                    <button
                                        className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex justify-center items-center"
                                        onClick={() => handleRemovePicture(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white  font-medium py-2 px-4 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}


export default AddCar;


