import React, { useState, useEffect } from 'react'

export function Restcountries({ onLocationSelect }) {
    const [countries, setCountries] = useState([])
    const [userInput, setUserInput] = useState('')

    useEffect(() => {
        // Fetch the list of countries
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                // Extract country names from the response
                const countryNames = data.map(country => country.name.common)
                setCountries(countryNames)
            })
            .catch(error => console.error('Error fetching countries:', error))
    }, [])

    const handleInputChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleAutoCompleteSelect = (selectedCountry) => {
        onLocationSelect(selectedCountry)
        setUserInput('') // Clear the input after selection
    }

    const matchingCountries = countries.filter(country =>
        country.toLowerCase().includes(userInput.toLowerCase())
    )

    return (
        <div>
            <input
                type='text'
                placeholder='Search for a country'
                value={userInput}
                onChange={handleInputChange}
            />
            {/* <ul>
                {matchingCountries.map((country, index) => (
                    <li key={index} onClick={() => handleAutoCompleteSelect(country)}>
                        {country}
                    </li>
                ))}
            </ul> */}
        </div>
    )
}
