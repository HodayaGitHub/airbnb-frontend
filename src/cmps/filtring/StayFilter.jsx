// const { useState, useEffect, useRef } = React

import React, { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service.js"
// import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
// import { MultiSelect } from './MultiSelect'
// import {SortByForm} from './SortByForm'

import { stayService } from "../../services/stay.service.js"

// Calendar imports
// import { DateRangeSelector } from "./DateRangeSelector.jsx"
// import { DateRangePicker} from 'react-dates';
// import { ReactdatesDatepicker} from './ReactdatesDatepicker.jsx';
// import { DateRangePicker} from './DateRangePicker.jsx';


export function StayFilter({ filterBy, onSetFilter, stays, guests, onSetGuestsCount }) {
    const [labelsData, setLabelsData] = useState();
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [regions, setRegion] = useState(stayService.getDefaultRegion())
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [showWhere, setShowWhere] = useState(false)

    const [showGuest, setShowGuest] = useState(false)

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


    function CustomInput({ id, label, type, onChange, value }) {
        return (
            <input
                id={id}
                type={type}
                name={id}
                onChange={onChange}
                value={value}
                placeholder={label}
            />
        );
    }

    function updateGuestCount(event, option, amount) {
        event.stopPropagation()
        setFilterByToEdit((prevFilter) => {
            const newCounts = { ...prevFilter.who, [option]: +prevFilter.who[option] + amount }
            const updatedFilterBy = {
                ...prevFilter,
                who: newCounts,
            }
            onSetFilter.current(updatedFilterBy)

            return updatedFilterBy
        })
    }

    function updateRegion(event, region) {
        event.stopPropagation();
        setSelectedRegion(region); 
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            where: region
        }));
        onSetFilter.current({
            ...filterByToEdit,
            where: region
        })
        setShowWhere(!region);

    }




    function handleWhoLabelClick() {
        setShowGuest((prevShowGuest) => !prevShowGuest)
    }

    function handleWhereLabelClick() {
        setShowWhere((prevShowWhere) => !prevShowWhere)
    }


    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === "number" ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

        // Invoke the debounced function
        onSetFilter.current(filterByToEdit)
    }

    // function handleWhereLabelClick() {
    //     console.log("Where label clicked");
    //     setShowDateRangeSelector((prevShowDateRangeSelector) => !prevShowDateRangeSelector)
    // }

    // function updateCount(event, option, amount) {
    //     event.stopPropagation()
    //     setGuestsCounts((prevCounts) => {
    //         const newCounts = { ...prevCounts, [option]: +prevCounts[option] + amount };
    //         onSetGuestsCount(newCounts);
    //         console.log('GuestsCounts', newCounts);
    //         return newCounts
    //     });
    // }
    return (
        <section className="stay-filter full main-layout">
            <div className="filter-container">

                    <div onClick={handleWhereLabelClick}>
                        where
                    </div>
                <div>
                    <label htmlFor="checkIn">Check in</label>
                    <input
                        id="checkIn"
                        type="date"
                        name="checkIn"
                        onChange={handleChange}
                        value={filterByToEdit.checkIn || ""}
                        placeholder="checkIn"
                    />
                </div>
                <div>
                    <label htmlFor="checkOut">Check out</label>
                    <input
                        id="checkOut"
                        type="date"
                        name="checkOut"
                        onChange={handleChange}
                        value={filterByToEdit.checkOut || ""}
                        placeholder="checkOut"
                    />
                </div>

                <div onClick={handleWhoLabelClick}>
                    Who
                </div>
            </div>

            {showWhere && (
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
                    {Object.entries(filterByToEdit.who).map(([guestType, count]) => (
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


            {/* <span onClick={handleWhereLabelClick}>Where</span> */}
            {/* 
    <DateRangePicker></DateRangePicker>
            <ReactdatesDatepicker/> */}
            {/* <span onClick={handleWhereLabelClick}>Where</span> */}
            {/* {showDateRangeSelector && ( */}

            {/* <DateRangeSelector
                        ranges={dynamicRanges}
                       onChange={handleDateRangeChange}
                        onSubmit={/* handle submit function */}
            {/* /> */}
            {/* )} } */}
            <div>
                {/* <label htmlFor="txt" onClick={handleWhereLabelClick()}>Where</label> */}


            </div>


        </section >
    )
}



