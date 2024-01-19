'use client'
import React, { useState, useEffect } from 'react'
import Title from './Title'
import Results from './Results'
import { useSelector } from 'react-redux'
import { useSearchCarsMutation } from '../../redux/services/carsService'
import algoliasearch from "algoliasearch/lite";

const SearchPage = () => {
    const searchTerm = useSelector((state) => state?.cars?.searchTerm);
    const [isLoading, setIsLoading] = useState(false);
    const [
        searchCars, {
            data: searchData,
            isError: isSearchError
        }] = useSearchCarsMutation()

    const performSearch = () => {
        setIsLoading(true);
        const client = algoliasearch(
            process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
        );

        const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

        index
            .search(searchTerm)
            .then(async ({ hits }) => {
                const resultsID = hits.map((result) => result.objectID);
                await searchCars(resultsID)
                    .then(() => {
                        setIsLoading(false)
                    })
            })
            .catch((error) => {
                console.error("Error performing search:", error);
                setIsLoading(false)
            });
    };

    useEffect(() => {
        if (searchTerm !== '') {
            performSearch()
        }
    }, [searchTerm])

    return (
        <div className='py-20 px-8 lg:px-20'>
            <Title title={searchTerm} />
            <Results
                data={searchData}
                isLoading={isLoading}
                isError={isSearchError}
            />
        </div>
    )
}

export default SearchPage
