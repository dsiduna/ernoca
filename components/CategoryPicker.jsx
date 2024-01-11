import React from 'react';

const CategoryPicker = ({ selectedCategory, categories = [], onChange }) => {

    return (
        <div className="flex flex-col w-full">
            <label htmlFor="year" className="text-md font-medium text-start">
                Product Category:
            </label>
            <select
                id="year"
                className="border border-gray-300 rounded px-2 py-2 mt-1"
                value={selectedCategory}
                onChange={(e) => onChange(e)}
            >
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryPicker;