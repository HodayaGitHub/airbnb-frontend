// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
// import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
// import { MultiSelect } from './MultiSelect'
// import {SortByForm} from './SortByForm'

import { stayService } from "../services/stay.service.js"
// import { loadLabels } from "../store/actions/stay.actions.js"



export function StayFilter({ filterBy, onSetFilter, stays }) {
    const [labelsData, setLabelsData] = useState();
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });

    onSetFilter = useRef(utilService.debounce(onSetFilter));

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


    function handleChange({ target }) {
        let { value, name: field, type } = target;

        // inputs in html are strings, if the type is number convert it to number
        value = type === "number" ? +value : value;

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));

        // Invoke the debounced function
        onSetFilter.current(filterByToEdit);
    }

    return (
        <section className="stay-filter full main-layout">
            <div className="filter-container">
                <div>
                    <form className="regular-form">
                        <label htmlFor="txt">Location:</label>
                        <input
                            id="txt"
                            type="text"
                            name="txt"
                            onChange={handleChange}
                            value={filterByToEdit.txt}
                            placeholder="Toy Name"
                        />

                        <label htmlFor="maxPrice">Max Price:</label>
                        <input
                            id="maxPrice"
                            type="number"
                            name="maxPrice"
                            onChange={handleChange}
                            value={filterByToEdit.maxPrice || ""}
                            placeholder="Max Price"
                        />
                    </form>
                </div>
            </div>
        </section>
    )
}



