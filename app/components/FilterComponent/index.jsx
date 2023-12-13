'use client'
import { useState, useEffect } from 'react';

const FilterComponent = ({ cars, onFilter }) => {
    const [make, setMake] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minYear, setMinYear] = useState(new Date().getFullYear() - 30);
    const [maxYear, setMaxYear] = useState(new Date().getFullYear());
    const [maximumYears, setMaximumYears] = useState([])

    const currentYear = new Date().getFullYear();
    const minYears = Array.from({ length: 30 }, (_, index) => currentYear - index);

    let maxYears = [];

    useEffect(() => {
        const filteredYears = minYears.filter((year) => year > minYear)
        setMaximumYears(filteredYears)
    }, [minYear])

    console.log(maxYears)
    const handleFilter = () => {
        const filteredCars = cars.filter(car => {
            if (make && car.make !== make) {
                return false;
            }
            if (minPrice && car.price < minPrice) {
                return false;
            }
            if (maxPrice && car.price > maxPrice) {
                return false;
            }
            if (minYear && car.year < minYear) {
                return false;
            }
            if (maxYear && car.year > maxYear) {
                return false;
            }
            return true;
        });

        onFilter(filteredCars);
    };

    return (
        <div className='bg-slate-100 p-8 py-4 m-4 text-slate-700 w-full'>
            <div className='font-semibold text-[20px]  pb-8'>Search for your dream car</div>
            <div className='grid grid-cols-3 gap-2 xs:grid-cols-1'>
                <div className='flex justify-start gap-4 items-center w-full'>
                    <label className=''>Make:</label>
                    <input type="text" className='w-full mr-8' value={make} onChange={(e) => setMake(e.target.value)} />
                </div>
                <div className='w-full flex gap-4 justify-start items-center'>
                    <label className=''>Budget:</label>
                    <input type="number" className='w-full mr-8' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
                <div className='w-full flex gap-4 justify-center items-center xs:justify-start'>
                    <label className=''>Years:</label>
                    <YearPicker
                        years={minYears.sort((a, b) => a - b)}
                        selectedYear={minYear}
                        onChange={(e) => setMinYear(e.target.value)}
                    />
                    <div>to</div>
                    <YearPicker
                        years={maximumYears}
                        selectedYear={maxYear}
                        onChange={(e) => setMaxYear(e.target.value)}
                    />
                </div>
            </div >
            <div className='flex justify-center items-center pt-4'>
                <button className='rounded-lg bg-[#32348e] hover:bg-[#bb2433] text-white px-4 py-1' onClick={handleFilter}>Filter</button>
            </div>
        </div>
    );
};

export default FilterComponent;

const YearPicker = ({ selectedYear, onChange, years }) => {
    return (
        <select
            id="year"
            className="border border-gray-300 rounded px-2 py-1 mt-1"
            value={selectedYear}
            onChange={(e) => onChange(e)}
        >
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};