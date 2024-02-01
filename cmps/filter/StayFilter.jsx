import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { FilterIcon } from '../../services/icons.service.jsx'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// import { setFilterBy } from '../store/actions/stay.actions.js'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export function StayFilter({ filterBy, onSetFilter, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const ANY_TYPE = 'Any type'
    const ROOM = 'Private room'
    const ENTIRE_HOME = 'Entire home/apt'


    useEffect(() => {
    }, [filterBy])


    function handlePlaceTypeClick(event, placeType) {
        event.stopPropagation()
        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, roomType: placeType }
            setFilterBy(updatedFilter)
        })
    }


    const numbers = Array.from({ length: 9 }, (_, index) => index + 1)


    return (
        <div className="stay-filter-container">
            <div className="filter-btn" onClick={handleOpen}>
                <FilterIcon />
                <span> Filter </span>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button className="close-btn" onClick={handleClose}> x </button>

                    <div className="btn-container">
                        <h2> Type of place</h2>
                        <button onClick={(event) => handlePlaceTypeClick(event, ANY_TYPE)} className="place-type-btn">Any type</button>
                        <button onClick={(event) => handlePlaceTypeClick(event, ROOM)} className="place-type-btn">Room</button>
                        <button onClick={(event) => handlePlaceTypeClick(event, ENTIRE_HOME)} className="place-type-btn">Entire home</button>
                    </div>

                    <div className="btn-container">
                        <h2> Price range</h2>
                        <button onClick={(event) => handlePlaceTypeClick(event, ANY_TYPE)} className="place-type-btn">Any type</button>
                        <button onClick={(event) => handlePlaceTypeClick(event, ROOM)} className="place-type-btn">Room</button>
                        <button onClick={(event) => handlePlaceTypeClick(event, ENTIRE_HOME)} className="place-type-btn">Entire home</button>
                    </div>


                    <section className="rooms-beds-container">
                        <span>Rooms and beds</span>
                        <div>
                            <span>Bedrooms</span>
                            {numbers.map((number) => (
                                <button key={number}>{number}</button>
                            ))}
                        </div>

                        <div>
                            <span>Beds</span>
                            {numbers.map((number) => (
                                <button key={number}>{number}</button>
                            ))}
                        </div>

                        <div>
                            <span>Bathrooms</span>
                            {numbers.map((number) => (
                                <button key={number}>{number}</button>
                            ))}
                        </div>
                    </section>

                </Box>
            </Modal>
        </div>
    )
}
