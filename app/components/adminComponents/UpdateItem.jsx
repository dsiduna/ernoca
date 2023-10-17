'use client'

import React, { useState, useRef } from 'react';
import addIcon from '../../assets/add.svg';
import Image from 'next/image';
import AlertAtom from '../AlertAtom';
import 'react-phone-input-2/lib/style.css'
import loader from '../../assets/loading.gif';
import { updateModal } from '../../redux/actions/modals';
import { useDispatch, useSelector } from 'react-redux';

import CarInput from './CarInput'
import { PictureItem } from './AddCar';

import { useUpdateCarMutation } from '../../redux/services/carsService';

const UpdateItem = () => {
  const dispatch = useDispatch();
  const {
    id = '',
    make = '',
    model = '',
    year = 0,
    price = '',
    colour = '',
    description = '',
    phone = '',
    mileage = 0,
    images = [],
  } = useSelector((state) => state.modal.car)

  const [updateCar, { isLoading: isUpdateCarLoading }] = useUpdateCarMutation();
  const initialState = {
    id: id,
    make: make,
    model: model,
    year: year,
    price: price,
    colour: colour,
    description: description,
    phone: phone,
    mileage: mileage,
    pictures: images,
  }
  const [carData, setCarData] = useState(initialState);
  const [isValid, setIsValid] = useState(true);

  const [errors, setErrors] = useState({
    make: '',
    model: '',
    price: '',
    colour: '',
    description: '',
  });

  const fileInputRef = useRef(null);

  const handleAddPictureClick = () => {
    fileInputRef.current.click();
  };

  const handlePictureUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + carData.pictures.length > 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        pictures: 'Cannot upload more than 10 pictures',
      }));
      return;
    }

    const pictureFiles = files.map((file) => file);
    setCarData((prevState) => ({
      ...prevState,
      pictures: prevState.pictures.concat(pictureFiles),
    }));

    // Reset the file input value after uploading
    fileInputRef.current.value = null;
    setErrors((prevErrors) => ({
      ...prevErrors,
      pictures: '', // Clear the error message after successful upload
    }));
  };

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

      await updateCar(carData).then(() => {
        setCarData(initialState)
        dispatch(updateModal("Congratulations"));
      })
    } catch (error) {
      console.log(error);
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
        <CarInput
          carData={carData}
          isValid={isValid}
          errors={errors}
          setCarData={setCarData}
          setErrors={setErrors}
          setIsValid={setIsValid}
        />
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
                pictureUrl={typeof pictureUrl === 'string' ? pictureUrl : URL.createObjectURL(pictureUrl)}
                alt={`Car Picture ${index + 1}`}
                onRemove={() => handleRemovePicture(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center flex-col pt-4'>
        {isUpdateCarLoading ? (
          <Image
            src={loader}
            alt=''
            width={48}
            height={48}
          />
        ) : (
          <button
            onClick={handleAddCar}
            className="bg-blue-500 hover:bg-blue-600 text-white  font-medium py-2 px-4 rounded-md"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

export default UpdateItem








