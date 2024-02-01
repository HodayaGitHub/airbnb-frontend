import React, { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service.js"
import { stayService } from "../../services/stay.service.js"
import { DateSelect } from './DateSelect.jsx'

export function StaySearch({ filterBy, onSetFilter, stays, guests, }) {
    const [labelsData, setLabelsData] = useState()
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [regions, setRegion] = useState(stayService.getDefaultRegion())
    const [selectedRegion, setSelectedRegion] = useState(null)

    const [showLocation, setShowLocation] = useState(false)
    const [showGuest, setShowGuest] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)

    // Calendar
    const [showDateRangeSelector, setShowDateRangeSelector] = useState(false)
    const [dynamicRanges, setDynamicRanges] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


    function updateGuestCount(event, option, amount) {
        event.stopPropagation()
        setFilterByToEdit((prevFilter) => {
            const newCounts = { ...prevFilter.guests, [option]: +prevFilter.guests[option] + amount }
            const updatedFilterBy = { ...prevFilter, guests: newCounts }
            onSetFilter.current(updatedFilterBy)
            return updatedFilterBy
        })
    }

    function updateRegion(event, region) {
        event.stopPropagation()
        setSelectedRegion(region)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, location: region }))
        onSetFilter.current({ ...filterByToEdit, location: region })
        setShowLocation(!region)

    }

    function handleGuestsLabelClick() {
        setShowGuest((prevShowGuest) => !prevShowGuest)
    }

    function handleLocationLabelClick() {
        setShowLocation((prevShowLocation) => !prevShowLocation)
    }

    function handleDatesLabelClick() {
        setShowCalendar((prevshowCalendar) => !prevshowCalendar)
    }



    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === "number" ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

        // Invoke the debounced function
        onSetFilter.current(filterByToEdit)
    }

    function handleDateSelectChange(field, value) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value, }))
        onSetFilter.current({ ...filterByToEdit, [field]: value })
    }


    return (
        <section className="stay-filter full main-layout">
            <div className="filter-container">

                <div className="location" onClick={handleLocationLabelClick}>
                    <p>Where</p>
                    <input type="text" placeholder="Where are you going?" />
                </div>

                <div className="check-in" onClick={handleDatesLabelClick}>
                    <p>Check in</p>
                    <input type="text" placeholder="Add dates" />
                </div>

                <div className="check-out">
                    <p>Check out</p>
                    <input type="text" placeholder="Add dates" />
                </div>

                <div className="guests" onClick={handleGuestsLabelClick}>
                    <p>Guests</p>
                    <input type="text" placeholder="Add guests" />
                    <span><i className="lni lni-search-alt"></i></span>
                </div>
            </div>

            <div className="filter-modal">
                {showCalendar && (
                    <DateSelect
                        onSetField={(field, value) => handleDateSelectChange(field, value)}
                        checkIn={filterByToEdit.checkIn}
                        checkOut={filterByToEdit.checkOut}
                    />
                )}

                {showLocation && (
                    <div>
                        {regions.map((region) => (
                            <div key={region}>
                                <button onClick={(event) => updateRegion(event, region)}>{region}</button>
                            </div>
                        ))}

                    </div>
                )}


                {showGuest && (
                    <div>
                        {Object.entries(filterByToEdit.guests).map(([guestType, count]) => (
                            <div key={guestType}>
                                <label htmlFor={guestType}>{guestType}</label>
                                <div>
                                    <button onClick={(event) => updateGuestCount(event, guestType, 1)}>+</button>
                                    <span>{count}</span>
                                    <button onClick={(event) => updateGuestCount(event, guestType, -1)}>-</button>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </section >
    )
}



