import React, { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service.js'
import { stayService } from '../../services/stay.service.js'
import { DateSelect } from './DateSelect.jsx'
import { SearchIcon } from '../../services/icons.service.jsx'
import { ButtonHover } from '../ButtonHover.jsx'
import { GuestCountModal } from './GuestCountModal.jsx'

export function StaySearch({ filterBy, onSetFilter, headerClassNames }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [regions, setRegion] = useState(stayService.getDefaultRegion())
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [modalOpen, setModalOpen] = useState(null)

    const REGION_MODAL = 'region'
    const GUEST_MODAL_STR = 'guest'
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

    function updateRegion(event, region) {
        event.stopPropagation()
        setModalOpen(null)
        setSelectedRegion(region)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, region: region }))
    }

    function handleChange(item) {
        const selection = item.selection;
        setRange([selection]);

        const checkInTimestamp = Math.floor(selection.startDate.getTime());
        const checkOutTimestamp = Math.floor(selection.endDate.getTime());

        if (selection.startDate === selection.endDate) {
            onSetField('checkIn', checkInTimestamp);
        } else {
            onSetField('checkOut', checkOutTimestamp);
        }
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

    function handleChange() {
        console.log('blah')
    }

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

    function getGuestsString() {
        let totalGuests = stayService.totalGuests(filterByToEdit)

        if (totalGuests > 0) {
            return `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`
        } else {
            return ''
        }
    }

    return (
        <section className={`stay-search `}>

            <div className={`search-container ${modalOpen !== null ? 'search-active' : ''}`}>

                <div className={`region search-div ${setActiveClass(REGION_MODAL)}`} onClick={() => handleSearchOptionClick(REGION_MODAL)}>
                    <div className='inner-div'>
                        <span>Where</span>
                        <input
                            type='text'
                            placeholder='Search destinations'
                            value={filterByToEdit?.region || ''}
                            onChange={handleChange}
                        // onInput={handleInput}
                        />
                    </div>
                </div>

                <div className={`date-item search-div ${setActiveClass(CHECK_IN_MODAL)}`}
                    onClick={() => handleSearchOptionClick(CHECK_IN_MODAL)}>
                    <div className='inner-div'>
                        <span>Check in</span>
                        <input
                            type='text'
                            placeholder='Add dates'
                            value={filterByToEdit.checkIn ? stayService.formatDateFromUnix(filterByToEdit.checkIn) : ''}
                            readOnly
                        />
                    </div>
                </div>

                <div className={`date-item search-div ${setActiveClass(CHECK_OUT_MODAL)}`}
                    onClick={() => handleSearchOptionClick(CHECK_OUT_MODAL)}>
                    <div className='inner-div'>
                        <span>Check out</span>
                        <input
                            type='text'
                            placeholder='Add dates'
                            value={filterByToEdit.checkOut ? stayService.formatDateFromUnix(filterByToEdit.checkOut) : ''}
                            readOnly
                        />
                    </div>
                </div>


                <div className={`search-last-section search-div ${setActiveClass(GUEST_MODAL_STR)}`}>
                    <div className='inner-div' onClick={() => handleSearchOptionClick(GUEST_MODAL_STR)}>
                        <span>Who</span>
                        <input type='text' placeholder='Add guests'
                            value={getGuestsString()}
                            readOnly
                        />
                    </div>
                    {modalOpen !== null ? (
                        <span className="search-icon" onClick={onSearch}>
                            <SearchIcon /> Search
                        </span>
                    ) : (
                        <span className="search-icon" onClick={onSearch}>
                            <SearchIcon />
                        </span>
                    )}


                    {modalOpen === GUEST_MODAL_STR && (
                        <GuestCountModal updateGuestCount={updateGuestCount} />
                    )}

                </div>

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

            </div>

            <>
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
