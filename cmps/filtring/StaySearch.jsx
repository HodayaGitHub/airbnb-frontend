import React, { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service.js'
import { stayService } from '../../services/stay.service.js'
import { DateSelect } from './DateSelect.jsx'
import { SearchIcon } from '../../services/icons.service.jsx'

export function StaySearch({ filterBy, onSetFilter }) {
    const [labelsData, setLabelsData] = useState()
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [regions, setRegion] = useState(stayService.getDefaultRegion())
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [modalOpen, setModalOpen] = useState(null)

    const DATE_MODAL = 'dates'
    const REGION_MODAL = 'region'
    const GUEST_MODAL = 'guest'

    function updateGuestCount(event, option, amount) {
        event.stopPropagation()
        setFilterByToEdit((prevFilter) => {
            const newCounts = {
                ...prevFilter.guests,
                [option]: +prevFilter.guests[option] + amount
            }
            const updatedFilterBy = { ...prevFilter, guests: newCounts }
            return updatedFilterBy
        })
    }

    function updateRegion(event, region) {
        event.stopPropagation()
        setSelectedRegion(region)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, location: region }))
    }

    function handleDateSelectChange(field, value) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSearch() {
        setModalOpen(null)
        onSetFilter({ ...filterByToEdit })
    }

    function handleSearchOptionClick(modalToOpen) {
        setModalOpen(modalToOpen)
    }

    function guestsAmount(guests) {
        const totalGuests =
            guests.adults +
            guests.children +
            guests.infants

        if (totalGuests > 0) {
            return `${totalGuests} guests`
        }
        return ''
    }

    return (
        <section className='stay-filter'>
            <div className='filter-container'>
                <div className='location' onClick={() => handleSearchOptionClick(REGION_MODAL)}>
                    <p>Where</p>
                    <input type='text' placeholder='Where are you going?'
                        value={filterByToEdit.location || ''}
                        readOnly
                    />
                </div>

                <div className='check-in' onClick={() => handleSearchOptionClick(DATE_MODAL)}>
                    <p>Check in</p>
                    <input
                        type='text'
                        placeholder='Add dates'
                        value={filterByToEdit.checkIn ? filterByToEdit.checkIn.toDateString() : ''}
                        readOnly
                    />
                </div>

                <div className='check-out' onClick={() => handleSearchOptionClick(DATE_MODAL)}>
                    <p>Check out</p>
                    <input
                        type='text'
                        placeholder='Add dates'
                        value={filterByToEdit.checkOut ? filterByToEdit.checkOut.toDateString() : ''}
                        readOnly
                    />
                </div>

                <div className='search-last-section'>
                    <span onClick={() => handleSearchOptionClick(GUEST_MODAL)}>
                        <p>Guests</p>
                        <input type='text' placeholder='Add guests'
                            value={guestsAmount(filterByToEdit.guests)}
                            readOnly
                        />
                    </span>
                    <span className="search-icon" onClick={onSearch} >
                        <SearchIcon />
                    </span>
                </div>

            </div>

            <div className='filter-modal'>

                {modalOpen === DATE_MODAL && (
                    <DateSelect
                        onSetField={(field, value) => handleDateSelectChange(field, value)}
                        checkIn={filterByToEdit.checkIn}
                        checkOut={filterByToEdit.checkOut}
                    />
                )}

                {modalOpen === REGION_MODAL && (
                    <div>
                        {regions.map((region) => (
                            <div key={region}>
                                <button onClick={(event) => updateRegion(event, region)}>
                                    {region}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {modalOpen === GUEST_MODAL && (
                    <div>
                        {Object.entries(filterByToEdit.guests).map(([guestType, count]) => (
                            <div key={guestType}>
                                <label htmlFor={guestType}>{guestType}</label>
                                <div>
                                    <button
                                        onClick={(event) => updateGuestCount(event, guestType, 1)}
                                    >
                                        +
                                    </button>
                                    <span>{count}</span>
                                    <button
                                        onClick={(event) => updateGuestCount(event, guestType, -1)}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
