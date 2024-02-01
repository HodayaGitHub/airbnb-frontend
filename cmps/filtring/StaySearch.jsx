import React, { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service.js'
import { stayService } from '../../services/stay.service.js'
import { DateSelect } from './DateSelect.jsx'
import { SearchIcon } from '../../services/icons.service.jsx'
import { MinusIcon, PlusIcon } from '../../services/icons.service.jsx'


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
            const currentCount = +prevFilter.guests[option]
            const newCount = Math.max(0, currentCount + amount)
            const newCounts = {
                ...prevFilter.guests,
                [option]: newCount
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
                <div className='region search-div' onClick={() => handleSearchOptionClick(REGION_MODAL)}>
                    <div className='inner-div'>
                        <span>Where</span>
                        <input type='text' placeholder='Search destinations'
                            value={filterByToEdit.location || ''}
                            readOnly
                        />
                    </div>
                </div>

                <div className='check-in search-div' onClick={() => handleSearchOptionClick(DATE_MODAL)}>
                    <div className='inner-div'>
                        <span>Check in</span>
                        <input
                            type='text'
                            placeholder='Add dates'
                            value={filterByToEdit.checkIn ? filterByToEdit.checkIn.toDateString() : ''}
                            readOnly
                        />
                    </div>
                </div>

                <div className='check-out search-div' onClick={() => handleSearchOptionClick(DATE_MODAL)}>
                    <div className='inner-div'>
                        <span>Check out</span>
                        <input
                            type='text'
                            placeholder='Add dates'
                            value={filterByToEdit.checkOut ? filterByToEdit.checkOut.toDateString() : ''}
                            readOnly
                        />
                    </div>
                </div>

                <div className='search-last-section search-div'>
                    <div onClick={() => handleSearchOptionClick(GUEST_MODAL)}>
                        <div className='inner-div'>
                            <span>Who</span>
                            <input type='text' placeholder='Add guests'
                                value={guestsAmount(filterByToEdit.guests)}
                                readOnly
                            />
                        </div>
                    </div>
                    <span className="search-icon" onClick={onSearch} >
                        <SearchIcon />
                    </span>

                    {modalOpen === GUEST_MODAL && (
                        <div className="guest-modal">
                            <div className="guest-wrapper">
                                {Object.entries(filterByToEdit.guests).map(([guestType, count]) => (
                                    <div className="guest-container" key={guestType}>

                                        <div className="guest-item">
                                            <span className="guest-title">{guestType}</span>
                                            <div className="guest-counter-btns">
                                                <button className="guest-counter-btn" onClick={(event) => updateGuestCount(event, guestType, -1)}
                                                    style={{ cursor: count <= 0 ? 'not-allowed' : 'pointer' }}
                                                    disabled={count <= 0}>
                                                    <MinusIcon />
                                                </button>
                                                <span className="counter">{count}</span>
                                                <button className="guest-counter-btn" onClick={(event) => updateGuestCount(event, guestType, 1)}>
                                                    <PlusIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    )}

                </div>


            </div>

            <>
                {modalOpen === REGION_MODAL && (
                    <div className="region-modal">
                        <div className="region-title">Search by region</div>
                        <div className="region-container">
                            {regions.map((region) => (
                                <div className="region-item" key={region.name} onClick={(event) => updateRegion(event, region.name)}>
                                    <img className="region-img" src={region.imgUrl} />
                                    <div>
                                        {region.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {modalOpen === DATE_MODAL && (
                    <div className="date-modal">
                        <DateSelect
                            onSetField={(field, value) => handleDateSelectChange(field, value)}
                            checkIn={filterByToEdit.checkIn}
                            checkOut={filterByToEdit.checkOut}
                        />
                    </div>

                )}


            </>
        </section>
    )
}
