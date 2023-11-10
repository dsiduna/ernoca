'use client'
import { useState } from 'react';

const FilterComponent = ({ cars, onFilter }) => {
    const [make, setMake] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minYear, setMinYear] = useState('');
    const [maxYear, setMaxYear] = useState('');

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
        <div>
            <h2>Car Filter</h2>
            <div>
                <label>Make:</label>
                <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
            </div>
            <div>
                <label>Min Price:</label>
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div>
                <label>Max Price:</label>
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <div>
                <label>Min Year:</label>
                <input type="number" value={minYear} onChange={(e) => setMinYear(e.target.value)} />
            </div>
            <div>
                <label>Max Year:</label>
                <input type="number" value={maxYear} onChange={(e) => setMaxYear(e.target.value)} />
            </div>
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default FilterComponent;