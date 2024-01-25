import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../utils/CapitaliseFirstLetter';



const FilterDropdown = ({ options, selectedOption, setSelectedOption = () => { } }) => {

    const handleOptionSelect = (event) => {
        const { value } = event.target;
        setSelectedOption(value);
    };

    return (
        <div className="relative inline-block w-full ml-4 xs:ml-0">
            <select
                value={selectedOption}
                placeholder='Filter by Catefory'
                onChange={handleOptionSelect}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
                <option value="">All</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {capitalizeFirstLetter(option)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterDropdown;