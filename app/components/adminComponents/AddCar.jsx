'use client'
import React, { useState, useRef } from 'react';
import addIcon from '../../assets/add.svg';
import Image from 'next/image';

const AddCar = ({
    addCar = () => { },
    isAddCarLoading = false,
    closemodal = () => { }
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

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePictureUpload = (e) => {
        fileInputRef.current.click();
        const files = Array.from(e.target.files);
        if (files.length + carData.pictures.length > 10) {
            // Display error message or prevent uploading more than 10 pictures
            return;
        }

        const pictureUrls = files.map((file) => URL.createObjectURL(file));
        setCarData((prevState) => ({
            ...prevState,
            pictures: prevState.pictures.concat(pictureUrls),
        }));
    };

    const handleAddPictureClick = () => {

    };

    const handleAddCar = async () => {
        try {
            addCar(carData);
            closemodal();
        } catch (error) {
            console.log(error);
            closemodal();
        }
    };

    return (
        <div className="container mx-auto overflow-hidden">
            <form onSubmit={handleAddCar}>
                <div className='flex flex-col justify-center items-center w-full h-[400px] overflow-y-auto'>
                    <div className='flex justify-center items-center gap-4 w-full p-4 pb-0 pt-32'>
                        <div className="mb-2 flex flex-col w-full">
                            <label htmlFor="make" className="text-md font-medium text-start">
                                Make:
                            </label>
                            <input
                                type="text"
                                id="make"
                                name="make"
                                value={carData.make}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-2 flex flex-col w-full">
                            <label htmlFor="model" className="text-md font-medium text-start">
                                Model:
                            </label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={carData.model}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-4 w-full p-4'>
                        <div className="flex flex-col w-full">
                            <label htmlFor="make" className="text-md font-medium text-start">
                                Colour:
                            </label>
                            <input
                                type="text"
                                id="colour"
                                name="colour"
                                value={carData.colour}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="model" className="text-md font-medium text-start">
                                Mileage:
                            </label>
                            <input
                                type="text"
                                id="mileage"
                                name="mileage"
                                value={carData.mileage}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-4 w-full p-4'>
                        <div className="flex flex-col w-full">
                            <label htmlFor="year" className="text-md font-medium">
                                Manufacture Year:
                            </label>
                            <input
                                type="text"
                                id="year"
                                name="year"
                                value={carData.year}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="price" className="text-md font-medium">
                                Price:
                            </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={carData.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                    <div className="p-4 w-full">
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
                    <div className="p-4 w-full">
                        <label htmlFor="pictures" className="text-md font-medium">
                            Pictures:
                        </label>
                        <div className="flex justify-start items-start">
                            <label htmlFor="pictures" className="text-lg font-medium cursor-pointer">
                                <Image
                                    src={addIcon}
                                    alt=""
                                    className="w-8 h-8 mr-2"
                                    onClick={handleAddPictureClick}
                                />
                            </label>
                            <input
                                type="file"
                                id="pictures"
                                name="pictures"
                                accept="image/*"
                                multiple
                                onChange={handlePictureUpload}
                                ref={fileInputRef}
                                className="hidden"
                            />
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

export default AddCar

