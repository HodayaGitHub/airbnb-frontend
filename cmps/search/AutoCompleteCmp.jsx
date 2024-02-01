import { Autocomplete } from '@mui/material'
import React, { useRef, useEffect } from 'react'
import { utilService } from '../../services/util.service'

export function AutoCompleteCmp({ onSetFilter, filterBy}) {
    const autocompleteRef = useRef(null)
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        if (autocompleteRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                autocompleteRef.current,
                {
                    types: ['(regions)'],
                }
            )

            autocomplete.addListener('place_changed', () => {
                const selectedPlace = autocomplete.getPlace().formatted_address
                console.log(selectedPlace)
                onSetFilter.current({ ...filterBy, region: selectedPlace })
                // onSetFilter.current(selectedPlace)

            })
        }
    }, [])

    return (
        <input
            ref={autocompleteRef}
            type='text'
            placeholder='Search for a region'
        />
    )
}

