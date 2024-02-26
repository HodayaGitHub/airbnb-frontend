import React, { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service.js'
import { stayService } from '../../services/stay.service.js'
import { DateSelect } from './DateSelect.jsx'
import { ServiceAnimalModal } from './ServiceAnimalModal.jsx'
import { SearchIcon } from '../../services/icons.service.jsx'
import { MinusIcon, PlusIcon } from '../../services/icons.service.jsx'
import { ButtonHover } from '../ButtonHover.jsx'

export function StaySearchOnScroll({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [regions, setRegion] = useState(stayService.getDefaultRegion())
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [modalOpen, setModalOpen] = useState(null)
    const [isPetsModalOpen, setIsPetsModalOpen] = useState(false)

    const REGION_MODAL = 'region'
    const GUEST_MODAL = 'guest'
    const CHECK_IN_MODAL = 'checkIn'
    const CHECK_OUT_MODAL = 'checkOut'


    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                !event.target.closest('.region-modal') &&
                !event.target.closest('.date-modal') &&
                !event.target.closest('.guest-modal') &&
                !event.target.closest('.search-container')
            ) {
                setModalOpen(null);
            }
        }

        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);


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
        setModalOpen(null)
        setSelectedRegion(region)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, region: region }))
    }

    function setActiveClass(selectedModal) {
        return (modalOpen === selectedModal) ? ' active' : ''
    }

    function onSearch() {
        setModalOpen(null)
        onSetFilter({ ...filterByToEdit })
    }

    function handleSearchOptionClick(modalToOpen) {
        setModalOpen(modalToOpen)
    }

    function handleDateSelectChange(field, value) {
        const valueToUnix = Math.floor(value.getTime());
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: valueToUnix }))

        if (field === 'checkOut' && valueToUnix) {
            setModalOpen(null);
        }
    }

    function serviceAnimalModalOpen() {
        setIsPetsModalOpen(true)
    }

    function serviceAnimalModalClose() {
        setIsPetsModalOpen(false)
    }

    function getGuestsString() {
        let totalGuests = stayService.totalGuests(filterByToEdit)

        if (totalGuests > 0) {
            return `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`
        } else {
            return ''
        }
    }

    const guestsDesc = {
        adults: 'Ages 13 or above',
        children: 'Ages 2-12',
        infants: 'Under 2',
        pets: 'Bringing a service animal?',
    }

    function handleChange() {
        console.log('blah')
    }

    return (
        <section className={`stay-search`}>

            <div className={`search-container ${modalOpen !== null ? 'search-active' : ''}`}>

                <div className={`region search-div ${setActiveClass(REGION_MODAL)}`} onClick={() => handleSearchOptionClick(REGION_MODAL)}>
                    <div className='inner-div'>
                        <span>Anywhere</span>
                    </div>
                </div>

                <div className={`date-item search-div ${setActiveClass(CHECK_IN_MODAL)}`}
                    onClick={() => handleSearchOptionClick(CHECK_IN_MODAL)}>
                    <div className='inner-div'>
                        <span>Any week</span>
                    </div>
                </div>

                <div className={`search-last-section search-div ${setActiveClass(GUEST_MODAL)}`}>
                    <div className='inner-div' onClick={() => handleSearchOptionClick(GUEST_MODAL)}>
                        <span>Guests</span>
                    </div>

                    <span className="search-icon" onClick={onSearch}>
                        <SearchIcon />
                    </span>

                    {isPetsModalOpen && <ServiceAnimalModal serviceAnimalModalClose={serviceAnimalModalClose} />}

                    {modalOpen === GUEST_MODAL && (
                        <div className="guest-modal">
                            <div className="guest-wrapper">
                                {Object.entries(filterByToEdit.guests).map(([guestType, guestInfo], index, array) => (
                                    <div className="guest-container" key={guestType}>

                                        <div className="guest-item">
                                            <div className="guests-info">
                                                <span className="guest-title">{guestType}</span>
                                                <span className={`guest-desc ${index === array.length - 1 ? 'service-animal' : ''}`}
                                                    onClick={index === array.length - 1 ? serviceAnimalModalOpen : null}>
                                                    {guestsDesc[guestType]}
                                                </span>
                                            </div>

                                            <div className="guest-counter-btns">
                                                <button className="guest-counter-btn" onClick={(event) => updateGuestCount(event, guestType, -1)}
                                                    style={{ cursor: guestInfo <= 0 ? 'not-allowed' : 'pointer' }}
                                                    disabled={guestInfo <= 0}>
                                                    <MinusIcon />
                                                </button>
                                                <span className="counter">{guestInfo}</span>
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
                    <div className="region-modal ">
                        <div className="region-title">Search by region</div>
                        <div className="region-container">
                            {regions.map((region) => (
                                <div className="region-item" key={region.name} onClick={(event) => updateRegion(event, region.name)}>
                                    <div><img className="region-img" src={region.imgUrl} /> </div>
                                    <div>
                                        {region.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {modalOpen === CHECK_IN_MODAL || modalOpen === CHECK_OUT_MODAL ? (
                    <div className="date-modal">
                        <DateSelect
                            onSetField={(field, value) => handleDateSelectChange(field, value)}
                            checkIn={filterByToEdit.checkIn}
                            checkOut={filterByToEdit.checkOut}
                        />
                    </div>
                ) : null}


            </>
        </section>
    )
}
