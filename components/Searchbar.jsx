'use client'

import React, { useState, ChangeEvent } from 'react';


const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="flex items-center w-full">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:border-grat-700 border-r-white"
            />
            <div className=" text-white px-4 py-1 rounded-r-xl  border border-gray-300 rounded-r-md focus:outline-none focus:border-grat-700 border-l-white">
                <svg className="w-4 py-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
        </div>
    );
};

export default SearchBar;