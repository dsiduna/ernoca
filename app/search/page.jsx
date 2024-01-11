'use client'
import React from 'react'
import Title from './Title'
import Results from './Results'
import { useSelector } from 'react-redux'

const SearchPage = () => {
    const searchTerm = useSelector((state)=> state?.cars?.searchTerm);
    return (
        <div className='py-20 px-8'>
            <Title title={searchTerm}/>
            <Results />
        </div>
    )
}

export default SearchPage