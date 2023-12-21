import React, { useState, useEffect, useRef } from 'react';
import { capitalizeFirstLetter } from '../../utils/CapitaliseFirstLetter';
import { conditions, fuel, transmission } from '../../utils/conditions';
import { towns } from '../../utils/towns';


const initialState = {
    make: null,
    maxPrice: 100000,
    minYear: new Date().getFullYear() - 30,
    maxYear: new Date().getFullYear(),
    condition: '',
    location: 'Harare',
    minMileage: 0,
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

            if (filters.make && carMake !== filters.make.trim().toLowerCase()) {
                return false;
            }
            if (filters.maxPrice && car.price > filters.maxPrice) {
                return false;
            }
            if (filters.minYear && car.year < filters.minYear) {
                return false;
            }
            if (filters.maxYear && car.year > filters.maxYear) {
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
    }

    return (
        <div className="bg-gray-100 p-4 m-8 mt-2 text-slate-900 rounded-xl shadow-md">
            <div className="font-semibold text-[20px] pb-4">Search for your dream car</div>
            <div className="grid grid-cols-4 gap-2 xs:grid-cols-1">
                <div className='flex flex-col gap-2'>
                    <div className="grid grid-cols-2 px-4 w-full items-center">
                        <label>Make:</label>
                        <select
                            id="make"
                            name="make"
                            className="border border-gray-300 rounded px-2 py-1 mt-1"
                            value={filters.make}
                            onChange={handleChange}
                        >
                            {makes.map((make, index) => (
                                <option key={index} value={make}>
                                    {capitalizeFirstLetter(make)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 w-full px-4 items-center">
                        <label>Condition:</label>
                        <select
                            id="condition"
                            name="condition"
                            className="border border-gray-300 rounded px-2 py-1 mt-1"
                            value={filters.condition}
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
                <div className='flex flex-col gap-2'>
                    <div className="grid grid-cols-2 w-full px-4 items-center">
                        <label>Transmission:</label>
                        <select
                            id="condition"
                            name="condition"
                            className="border border-gray-300 rounded px-2 py-1 mt-1"
                            value={filters.condition}
                            onChange={handleChange}
                        >
                            {transmission.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 w-full px-4 items-center">
                        <label>Fuel:</label>
                        <select
                            id="condition"
                            name="condition"
                            className="border border-gray-300 rounded px-2 py-1 mt-1"
                            value={filters.condition}
                            onChange={handleChange}
                        >
                            {fuel.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className="w-full grid grid-cols-2 px-4 items-center">
                        <label>Budget:</label>
                        <input
                            type="text"
                            name="maxPrice"
                            className="w-full mr-8 rounded-md py-1 pl-2"
                            value={`$${filters.maxPrice}`}
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
                        <label>Mileage:</label>
                        <MileageRangeComponent
                            initialMaxMileage={filters.maxMileage}
                            initialMinMileage={filters.minMileage}
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
    );
};

export default FilterComponent;

const YearPicker = ({ selectedYear, onChange, years, name }) => {
    return (
        <select
            id="year"
            className="border border-gray-300 rounded px-2 py-1 mt-1"
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
                className='w-full mr-8 rounded-md py-1 pl-2 border border-gray-300'
            />
            {isOpen && (
                <ul className="absolute z-10 bg-white mt-2 py-1 rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const MileageRangeComponent = ({ initialMinMileage, initialMaxMileage, onRangeChange }) => {
    const [minMileage, setMinMileage] = useState(initialMinMileage);
    const [maxMileage, setMaxMileage] = useState(initialMaxMileage);

    useEffect(() => {
        if (minMileage >= maxMileage) {
            setMaxMileage(minMileage + 50000);
        }
    }, [minMileage]);

    const handleMinMileageChange = (event) => {
        const newMinMileage = parseInt(event.target.value);
        setMinMileage(newMinMileage);
    };

    const handleMaxMileageChange = (event) => {
        const newMaxMileage = parseInt(event.target.value);
        setMaxMileage(newMaxMileage);
    };

    const renderMileageOptions = () => {
        const options = [];
        for (let i = 50000; i <= 400000; i += 50000) {
            options.push(
                <option key={i} value={i}>
                    {i.toLocaleString()}
                </option>
            );
        }
        options.push(
            <option key={500000} value={500000}>
                400,000+
            </option>
        );
        return options;
    };

    return (
        <div className='flex gap-1 justify-between items-center'>
            <select
                id="minMileage"
                value={minMileage}
                onChange={handleMinMileageChange}
                className='py-1 rounded-md'
            >
                {renderMileageOptions()}
            </select>
            <div>to</div>
            <select
                id="maxMileage"
                value={maxMileage}
                onChange={handleMaxMileageChange}
                className='py-1 rounded-md'
            >
                {renderMileageOptions()}
            </select>
        </div>
    );
};
