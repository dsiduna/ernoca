import React, { useState, useEffect, useRef } from 'react';
import { capitalizeFirstLetter } from '../../utils/CapitaliseFirstLetter';
import { conditions, fuel, transmission } from '../../utils/conditions';
import { towns } from '../../utils/towns';

import { Listbox, Transition } from "@headlessui/react"


const initialState = {
    make: [],
    maxPrice: 100000,
    minYear: new Date().getFullYear() - 30,
    maxYear: new Date().getFullYear(),
    condition: [],
    transmission: [],
    fuel: [],
    location: null,
    maxMileage: 300000,
};

const FilterComponent = ({
    cars,
    makes = [],
    onFilter,
    onReset = () => { },
}) => {
    const [filters, setFilters] = useState(initialState);

    const currentYear = new Date().getFullYear();
    const minYears = Array.from({ length: 30 }, (_, index) => currentYear - index);
    const [maximumYears, setMaximumYears] = useState([]);

    useEffect(() => {
        const filteredYears = minYears.filter((year) => year > filters.minYear);
        setMaximumYears(filteredYears);
    }, [filters.minYear]);

    const handleFilter = () => {
        const filteredCars = cars.filter((car) => {
            const carMake = car.make.trim().toLowerCase();

            // Filter by make
            if (filters.make.length > 0 && !filters.make.includes(carMake)) {
                return false;
            }

            // Filter by max price
            if (filters.maxPrice && parseInt(car.price) > parseInt(filters.maxPrice)) {
                return false;
            }

            // Filter by max mileage
            if (
                filters.maxMileage !== null &&
                filters.maxMileage !== 0 &&
                parseInt(car.mileage) > parseInt(filters.maxMileage)
            ) {
                return false;
            }

            // Filter by min year
            if (filters.minYear && car.year < filters.minYear) {
                return false;
            }

            // Filter by max year
            if (filters.maxYear && car.year > filters.maxYear) {
                return false;
            }

            // Filter by condition
            if (
                filters.condition.length > 0 &&
                !filters.condition.includes(car.condition)
            ) {
                return false;
            }

            // Filter by transmission
            if (
                filters.transmission.length > 0 &&
                !filters.transmission.includes(car.transmission)
            ) {
                return false;
            }

            // Filter by fuel
            if (filters.fuel.length > 0 && !filters.fuel.includes(car.fuel)) {
                return false;
            }

            //filter by location
            if (filters.location && car.location !== filters.location) {
                return false;
            }

            return true;
        });

        onFilter(filteredCars);
    };

    const resetFilter = () => {
        setFilters(initialState);
        onReset();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const setLocation = (place) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            location: place
        }))
    };

    const setMaxMileage = (mileage) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            maxMileage: parseInt(mileage.target.value)
        }))
    };

    const setSelectedItems = (selectedItemsUpdated, filterName) => {
        setFilters((prevState) => ({
            ...prevState,
            [filterName]: selectedItemsUpdated,
        }));
    };
    return (
        <div className='my-4 px-8 xs:px-4 sm:px-4 w-full'>
            <div className="bg-gray-100 p-4 text-slate-900 rounded-xl shadow-md w-full flex flex-col items-center justify-center">
                <div className="font-semibold text-[24px] sm:text-[16px] md:text-[20px] xs:text-[14px] text-center pb-4">Search for your dream car</div>
                <div className="grid grid-cols-4 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full">
                    <div className='flex flex-col gap-2 w-full'>
                        <MultipleSelect
                            label="Makes"
                            filterName="make"
                            items={makes}
                            selectedItems={filters.make}
                            setSelectedItems={setSelectedItems}
                        />
                        <MultipleSelect
                            label="Condition"
                            filterName="condition"
                            items={conditions}
                            selectedItems={filters.condition}
                            setSelectedItems={setSelectedItems}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <MultipleSelect
                            label="Transmission"
                            filterName="transmission"
                            items={transmission}
                            selectedItems={filters.transmission}
                            setSelectedItems={setSelectedItems}
                        />
                        <MultipleSelect
                            label="Fuel"
                            filterName="fuel"
                            items={fuel}
                            selectedItems={filters.fuel}
                            setSelectedItems={setSelectedItems}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className="w-full grid grid-cols-2 px-4 items-center">
                            <label>Budget:</label>
                            <input
                                type="text"
                                name="maxPrice"
                                className="w-full mr-8 rounded-md py-1 pl-2"
                                value={filters.maxPrice}
                                onChange={handleChange}
                            />
                        </div>
                        <div className=" grid grid-cols-2 px-4 items-center">
                            <label>Location:</label>
                            <CitySuggestInput
                                location={filters.location}
                                towns={towns}
                                setLocation={setLocation}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className="w-full px-4 flex gap-4 justify-between items-center">
                            <label>Mnf:</label>
                            <YearPicker
                                name="minYear"
                                years={minYears.sort((a, b) => a - b)}
                                selectedYear={filters.minYear}
                                onChange={handleChange}
                            />
                            <div>to</div>
                            <YearPicker
                                name="maxYear"
                                years={maximumYears.sort((a, b) => b - a)}
                                selectedYear={filters.maxYear}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full flex px-4 gap-4 justify-between items-center">
                            <label>Max Mileage:</label>
                            <MileageRangeComponent
                                maxMileage={filters.maxMileage}
                                setMaxMileage={setMaxMileage}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-8 pt-4">
                    <button
                        className="rounded-lg bg-[#32348e] hover:bg-[#bb2433] text-white px-4 py-1"
                        onClick={handleFilter}
                    >
                        Filter
                    </button>
                    <button
                        className="rounded-lg bg-[#32348e] hover:bg-[#bb2433] text-white px-4 py-1"
                        onClick={resetFilter}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterComponent;

const YearPicker = ({ selectedYear, onChange, years, name }) => {
    return (
        <select
            id="year"
            className="border border-gray-300 rounded px-2 py-1 mt-1 xs:text-sm sm:text-sm xs:leading-2 sm:text-sm"
            value={selectedYear}
            onChange={onChange}
            name={name}
        >
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};




export const CitySuggestInput = ({ location, towns, setLocation = () => { } }) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);

        const filteredSuggestions = towns.filter((city) =>
            city.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setIsOpen(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion);
        setValue(suggestion);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Car Location"
                className='w-full mr-8 rounded-md py-1 pl-2 border border-gray-300 xs:text-sm xs:leading-2'
            />
            {isOpen && (
                <ul className="absolute z-10 bg-white mt-2 py-1 rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 xs:text-sm xs:leading-2"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const MileageRangeComponent = ({ maxMileage, setMaxMileage = () => { } }) => {


    const renderMileageOptions = () => {
        const options = [];
        for (let i = 0; i <= 400000; i += 50000) {
            options.push(
                <option key={i} value={i}>
                    {i.toLocaleString()}
                </option>
            );
        }
        options.push(
            <option key={500000} value={500000}>
                400k +
            </option>
        );
        return options;
    };

    return (
        <div className='flex gap-1 justify-between items-center xs:text-sm xs:leading-2 sm:text-sm sm:leading-4'>
            <select
                id="maxMileage"
                value={maxMileage}
                onChange={setMaxMileage}
                className='py-1 rounded-md'
            >
                {renderMileageOptions()}
            </select>
        </div>
    );
};

const MultipleSelect = ({ label, filterName, items, selectedItems, setSelectedItems = () => { } }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    function isSelected(value) {
        return selectedItems.find((el) => el === value) ? true : false;
    }


    function handleSelect(value) {
        if (!isSelected(value)) {
            const selectedItemsUpdated = [
                ...selectedItems,
                items.find((el) => el === value),
            ];
            setSelectedItems(selectedItemsUpdated, filterName);
        } else {
            handleDeselect(value);
        }
        setIsOpen(true);
    }

    function handleDeselect(value) {
        const selectedItemsUpdated = selectedItems.filter((el) => el !== value);
        setSelectedItems(selectedItemsUpdated, filterName);
        setIsOpen(true);
    }

    return (
        <div className="" ref={dropdownRef}>
            <div className="w-full">
                <Listbox
                    as="div"
                    className=""
                    value={selectedItems}
                    onChange={(value) => handleSelect(value)}
                    open={isOpen}
                >
                    {() => (
                        < div className='grid grid-cols-2 px-4 w-full items-center xs:text-md'>
                            <label>{label}:</label>
                            <div className="relative">
                                <span className="inline-block w-full rounded-md shadow-sm z-10">
                                    <Listbox.Button
                                        className="cursor-default relative w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm xs:text-sm xs:leading-2 sm:leading-5"
                                        onClick={() => setIsOpen(!isOpen)}
                                        open={isOpen}
                                    >
                                        <span className="block truncate">
                                            {selectedItems.length < 1
                                                ? `Select ${label}`
                                                : `${label} (${selectedItems.length})`}
                                        </span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </Listbox.Button>
                                </span>

                                <Transition
                                    unmount={false}
                                    show={isOpen}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-50"
                                >
                                    <Listbox.Options
                                        static
                                        className="max-h-60 z-50 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                                    >
                                        {items.map((item) => {
                                            const selected = isSelected(item);
                                            return (
                                                <Listbox.Option key={item} value={item}>
                                                    {({ active }) => (
                                                        <div
                                                            className={`${active
                                                                ? "text-white bg-[#32348e]"
                                                                : "text-gray-900"
                                                                } cursor-default select-none relative py-2 pl-8 pr-4 xs:text-sm xs:leading-2 sm:text-sm xs:leading-4`}
                                                        >
                                                            <span
                                                                className={`${selected ? "font-semibold" : "font-normal"
                                                                    } block truncate`}
                                                            >
                                                                {capitalizeFirstLetter(item)}
                                                            </span>
                                                            {selected && (
                                                                <span
                                                                    className={`${active ? "text-white" : "text-[#32348e]"
                                                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                                >
                                                                    <svg
                                                                        className="h-5 w-5"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </Listbox.Option>
                                            );
                                        })}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </div>
                    )}
                </Listbox>
            </div>
        </div>
    );
}
