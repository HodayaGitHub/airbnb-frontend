import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
// import { Modal } from '@mui/base/Modal';


import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FilterIcon, TopTierIcon } from '../../services/icons.service.jsx'
import { PriceRange } from './PriceRange.jsx'
import _debounce from 'lodash/debounce'

// import { setFilterBy } from '../store/actions/stay.actions.js'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60dvw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
    height: '95dvh',
    border: '1px solid #00000045',
    borderRadius: '10px',
    padding: '20px 50px',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
}

export function StayFilter({ filterBy, onSetFilter }) {
    // Room Type 
    const ANY_TYPE = 'Any type'
    const ROOM = 'Private room'
    const ENTIRE_HOME = 'Entire home/apt'


    // Rooms and beds 
    const BEDROOMS = 'bedrooms'
    const BEDS = 'beds'
    const BATHROOMS = 'bathrooms'

    const { stays, totalDocumentsCount } = useSelector(storeState => storeState.stayModule)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy, roomType: ANY_TYPE })

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    useEffect(() => {
        onSetFilter({ ...filterByToEdit })
    }, [filterByToEdit])


    function handlePlaceTypeClick(event, placeType) {
        event.stopPropagation()
        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, roomType: placeType }
            // setFilterByToEdit(updatedFilter)
            return updatedFilter

        })
    }

    function handlePriceChange(priceType, priceToupdate) {
        _debounce(() => {
            setFilterByToEdit((prevFilter) => {
                const updatedFilter = { ...prevFilter, price: { ...prevFilter.price, [priceType]: priceToupdate } }
                return updatedFilter
            })
        }, 400)()
    }

    function handleRoomFilterClick(event, category, number) {
        event.stopPropagation()

        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, [category]: number }
            return updatedFilter
        })
        console.log(`Clicked ${category} - Number: ${number}`)
    }

    function GuestFavorites() {
        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, guestFavorite: !prevFilter.guestFavorite }
            return updatedFilter
        })

    }
    const numbers = Array.from({ length: 9 }, (_, index) => index + 1)


    return (
        <div className="stay-filter-container">
            <div className="filter-btn" onClick={handleOpen}>
                <FilterIcon />
                <span> Filters </span>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <section className='filter-options-container'>

                        <div className='headline-container'>
                            <span className="close-btn" onClick={handleClose}> ✕ </span>
                            <span className='filter-title'>Filters</span>
                        </div>


                        <div className="type-of-place-container">
                            <span>
                                <h4>Type of place</h4>
                                <h6>Search rooms, entire homes, or any type of place.</h6>
                            </span>
                            <div className='place-type-btns-container'>
                                <span onClick={(event) => handlePlaceTypeClick(event, ANY_TYPE)}
                                    className={`place-type-btn ${filterByToEdit.roomType === ANY_TYPE ? 'selected' : ''}`}>
                                    Any type
                                </span>

                                <span onClick={(event) => handlePlaceTypeClick(event, ROOM)}
                                    className={`place-type-btn ${filterByToEdit.roomType === ROOM ? 'selected' : ''}`}>
                                    Room
                                </span>

                                <span onClick={(event) => handlePlaceTypeClick(event, ENTIRE_HOME)}
                                    className={`place-type-btn ${filterByToEdit.roomType === ENTIRE_HOME ? 'selected' : ''}`}>
                                    Entire home</span>
                            </div>
                        </div>

                        <PriceRange handlePriceChange={handlePriceChange} filterBy={filterBy} stays={stays} />

                        <section className="rooms-beds-container">
                            <span><h3>Rooms and beds</h3></span>
                            <div className="rooms-option">
                                <span className="first-item">Bedrooms</span>
                                <span className="second-item">
                                    {numbers.map((number) => (
                                        <button onClick={(event) => handleRoomFilterClick(event, BEDROOMS, number)} key={number}>{number}</button>
                                    ))}
                                </span>
                            </div>

                            <div className="rooms-option" >
                                <span className="first-item">Beds</span>
                                <span className="second-item">
                                    {numbers.map((number) => (
                                        <button onClick={(event) => handleRoomFilterClick(event, BEDS, number)} key={number}>{number}</button>
                                    ))}
                                </span>

                            </div>

                            <div className="rooms-option">
                                <span className="first-item">Bathrooms</span>
                                <span className="second-item">
                                    {numbers.map((number) => (
                                        <button onClick={(event) => handleRoomFilterClick(event, BATHROOMS, number)} key={number}>{number}</button>
                                    ))}
                                </span>

                            </div>

                        </section>

                        <div className="top-tier">
                            Top-tier stays
                            <div className={`top-tier-details ${filterByToEdit.guestFavorite ? 'active' : ''}`} onClick={GuestFavorites}>
                                <TopTierIcon />
                                <span> Guest favorites</span>
                                <span>The most loved homes on Airbnb, according to guests</span>
                            </div>

                        </div>

                        <button>{`Show ${totalDocumentsCount} places`}</button>
                    </section>

                </Box>
            </Modal>

        </div>
    )
}
