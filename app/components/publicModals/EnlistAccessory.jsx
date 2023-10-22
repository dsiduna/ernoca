'use client'

import React, { useState, useRef } from 'react';
import addIcon from '../../assets/add.svg';
import Image from 'next/image';
import AlertAtom from '../AlertAtom';
import 'react-phone-input-2/lib/style.css'
import loader from '../../assets/loading.gif';
import { updatePublicModal } from '../../redux/actions/modals';
import { useDispatch } from 'react-redux';

import AccessoriesInput from '../adminComponents/AccessoriesInput'

import { useAddPendingAccessoryMutation } from '../../redux/services/pendingService';

import { PictureItem } from '../adminComponents/AddCar';

const EnlistAccessory = () => {
  const dispatch = useDispatch();
  const [addPendingAccessory, { isLoading: isAddPendingAccessoryLoading }] = useAddPendingAccessoryMutation();
  const initialState = {
    name: '',
    price: '',
    specs: '',
    phone: '',
    category: '',
    pictures: [],
  }
  const [accessoryData, setAccessoryData] = useState(initialState);
  const [isValid, setIsValid] = useState(true);

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    specs: '',
    pictures: '',
  });

  const fileInputRef = useRef(null);

  const handleAddPictureClick = () => {
    fileInputRef.current.click();
  };

  const handlePictureUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + accessoryData.pictures.length > 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        pictures: 'Cannot upload more than 10 pictures',
      }));
      return;
    }

    const pictureFiles = files.map((file) => file);
    setAccessoryData((prevState) => ({
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
    setAccessoryData((prevState) => {
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
      price: '',
      specs: '',
      pictures: '',
    };
    let isValid = true;

    if (accessoryData.name === '') {
      newErrors.make = 'Name is required';
      isValid = false;
    }

    if (accessoryData.price === '') {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(accessoryData.price)) {
      newErrors.price = 'Invalid Price';
      isValid = false;
    }

    if (accessoryData.pictures.length < 1) {
      newErrors.pictures = 'Attach Pictures';
      isValid = false;
    }

    if (accessoryData.specs === '') {
      newErrors.mileage = 'Specs is required';
      isValid = false;
    }
    setErrors(newErrors);
    setIsValid(isValid);

    return isValid;
  };

  const handleClearErrors = () => {
    setIsValid(true);
    setErrors({
      name: '',
      price: '',
      specs: '',
      pictures: '',
    })
  }

  const handleAddaccessory = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      await addPendingAccessory(accessoryData).then(() => {
        setAccessoryData(initialState)
        dispatch(updatePublicModal("Congratulations"));
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
        <AccessoriesInput
          accessoryData={accessoryData}
          isValid={isValid}
          errors={errors}
          setAccessoryData={setAccessoryData}
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
            {accessoryData.pictures.map((pictureUrl, index) => (
              <PictureItem

                key={index}
                pictureUrl={URL.createObjectURL(pictureUrl)}
                alt={`accessory Picture ${index + 1}`}
                onRemove={() => handleRemovePicture(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center flex-col'>
        {isAddPendingAccessoryLoading ? (
          <Image
            src={loader}
            alt=''
            width={48}
            height={48}
          />
        ) : (
          <button
            onClick={handleAddaccessory}
            className="bg-blue-500 hover:bg-blue-600 text-white  font-medium py-2 px-4 rounded-md"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}


export default EnlistAccessory;



