import React from 'react';

const YearPicker = ({ selectedYear, onChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, index) => currentYear - index);

    return (
        <div className="flex flex-col w-full">
            <label htmlFor="year" className="text-md font-medium text-start">
                Manufacture Year:
            </label>
            <select
                id="year"
                className="border border-gray-300 rounded px-2 py-2 mt-1"
                value={selectedYear}
                onChange={(e) => onChange(e)}
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YearPicker;