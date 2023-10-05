import React from 'react';

const InputField = ({ label, id, name, value, onChange, error }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="text-md font-medium text-start">
                {label}:
            </label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default InputField;