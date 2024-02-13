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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export function StayFilter({ filterBy, onSetFilter }) {
    const { stays, totalDocumentsCount } = useSelector(storeState => storeState.stayModule)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // Room Type 
    const ANY_TYPE = 'Any type'
    const ROOM = 'Private room'
    const ENTIRE_HOME = 'Entire home/apt'


    // Rooms and beds 
    const BEDROOMS = 'bedrooms'
    const BEDS = 'beds'
    const BATHROOMS = 'bathrooms'

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
                    <button className="close-btn" onClick={handleClose}> x </button>

                    <div className="btn-container">
                        <h3> Type of place</h3>
                        <button onClick={(event) => handlePlaceTypeClick(event, ANY_TYPE)} className="place-type-btn">Any type</button>
                        <button onClick={(event) => handlePlaceTypeClick(event, ROOM)} className="place-type-btn">Room</button>
                        <button onClick={(event) => handlePlaceTypeClick(event, ENTIRE_HOME)} className="place-type-btn">Entire home</button>
                    </div>

                    <div className="place-range-container">
                        <h3> Price range</h3>
                        <PriceRange handlePriceChange={handlePriceChange} filterBy={filterBy} stays={stays} />
                    </div>

                    <section className="rooms-beds-container">
                        <span><h3>Rooms and beds</h3></span>
                        <div className="rooms-option">
                            <span className="first-item">Bedrooms</span>
                            <span className="second-item">                                {numbers.map((number) => (
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
                            <span className="second-item">                                {numbers.map((number) => (
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
                </Box>
            </Modal>

        </div>
    )
}
