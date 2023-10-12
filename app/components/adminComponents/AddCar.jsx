'use client'

import React, { useState, useRef } from 'react';
import addIcon from '../../assets/add.svg';
import InputField from '../InputField';
import Image from 'next/image';
import YearPicker from '../YearPicker';
import AlertAtom from '../AlertAtom';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PictureItem = React.memo(({ pictureUrl, alt, onRemove }) => (
    <div className="relative">
        <Image
            src={pictureUrl}
            alt={alt}
            className="h-20 w-20 object-cover mr-2 rounded"
            loader={() => pictureUrl}
            width={20}
            height={20}
        />
        <button
            className="absolute top-0 right-0  transform -translate-x-1/2 w-6 h-6 bg-red-500 text-white rounded-full flex justify-center items-center"
            onClick={onRemove}
        >
            ×
        </button>
    </div>
));

const AddCar = ({
    addCar = () => { },
    isAddCarLoading = false,
    closemodal = () => { },
}) => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: new Date().getFullYear() - 29,
        price: '',
        colour: '',
        description: '',
        phone: '',
        mileage: 0,
        pictures: [],
    });
    const [isValid, setIsValid] = useState(true);

    const [errors, setErrors] = useState({
        make: '',
        model: '',
        price: '',
        colour: '',
        description: '',
    });

    const fileInputRef = useRef(null);

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

    const handlePhoneChange = (phone) => {
        setCarData((prevState) => ({
            ...prevState,
            phone: phone,
        }))
    }

    const handleRemovePicture = (index) => {
        setCarData((prevState) => {
            const updatedPictures = [...prevState.pictures];
            updatedPictures.splice(index, 1);
            return {
                ...prevState,
                pictures: updatedPictures
            };
        });
    };

    const validateInputs = () => {
        const newErrors = {
            make: '',
            model: '',
            price: '',
            colour: '',
            description: '',
        };
        let isValid = true;

        if (carData.make === '') {
            newErrors.make = 'Make is required';
            isValid = false;
        }

        if (carData.model === '') {
            newErrors.model = 'Model is required';
            isValid = false;
        }

        if (carData.price === '') {
            newErrors.price = 'Price is required';
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test(carData.price)) {
            newErrors.price = 'Invalid Price';
            isValid = false;
        }

        if (carData.colour === '') {
            newErrors.colour = 'Colour is required';
            isValid = false;
        }

        if (carData.mileage === '') {
            newErrors.mileage = 'Mileage is required';
            isValid = false;
        } else if (!/^\d+$/.test(carData.mileage)) {
            newErrors.mileage = 'Invalid Mileage';
            isValid = false;
        }

        setErrors(newErrors);
        setIsValid(isValid);

        return isValid;
    };

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

    const handleAddCar = async () => {
        try {
            if (!validateInputs()) {
                return;
            }

            // Perform further actions for adding the car
            // and closing the modal
        } catch (error) {
            console.log(error);
            // Handle error here
        }
    };


    return (
        <div className="container mx-auto overflow-hidden">
            {!isValid && <AlertAtom
                msg='Plese fill in ALL required fields and retry'
                buttonLabel='Ok'
                action={handleClearErrors}
            />
            }
            <div className="flex flex-col justify-center items-center w-full h-[400px] overflow-y-auto">
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
                <div className="p-2 w-full">
                    <label htmlFor="pictures" className="text-md font-medium">
                        Pictures:
                    </label>
                    <div className='grid grid-cols-4 gap-2 mt-2'>
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
                            <PictureItem

                                key={index}
                                pictureUrl={pictureUrl}
                                alt={`Car Picture ${index + 1}`}
                                onRemove={() => handleRemovePicture(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <button
                    onClick={handleAddCar}
                    className="bg-blue-500 hover:bg-blue-600 text-white  font-medium py-2 px-4 rounded-md"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}


export default AddCar;



