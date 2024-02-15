import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FilterIcon, TopTierIcon } from '../../services/icons.service.jsx';
import { PriceRange } from './PriceRange.jsx';
import { RoomsBeds } from './RoomsBeds.jsx';
import _debounce from 'lodash/debounce';


const style = {
    bgcolor: 'background.paper',
    p: 4,
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
    const [selectedRoomFilters, setSelectedRoomFilters] = useState({
        [BEDROOMS]: 'Any',
        [BEDS]: 'Any',
        [BATHROOMS]: 'Any',
    });

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    useEffect(() => {
        onSetFilter({ ...filterByToEdit })
    }, [filterByToEdit])

    function handleRoomFilterClick(event, category, number) {
        event.stopPropagation();
        setSelectedRoomFilters((prevFilters) => ({
            ...prevFilters,
            [category]: number,
        }));
        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, [category]: number };
            return updatedFilter;
        });
    }

    function handlePlaceTypeClick(event, placeType) {
        event.stopPropagation();
        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, roomType: placeType };
            // setFilterByToEdit(updatedFilter)
            return updatedFilter;

        });
    };

    function handlePriceChange(priceType, priceToupdate) {
        _debounce(() => {
            setFilterByToEdit((prevFilter) => {
                const updatedFilter = { ...prevFilter, price: { ...prevFilter.price, [priceType]: priceToupdate } };
                return updatedFilter
            });
        }, 400)()
    };


    function GuestFavorites() {
        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, guestFavorite: !prevFilter.guestFavorite }
            return updatedFilter
        })

    }


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

                        <div className="rooms-beds-container">
                            <span>
                                <h3>Rooms and beds</h3>
                            </span>
                            <RoomsBeds
                                category={BATHROOMS}
                                selectedRoomFilters={selectedRoomFilters[BATHROOMS]}
                                handleRoomFilterClick={handleRoomFilterClick}
                            />

                            <RoomsBeds
                                category={BEDS}
                                selectedRoomFilters={selectedRoomFilters[BEDS]}
                                handleRoomFilterClick={handleRoomFilterClick}
                            />

                            <RoomsBeds
                                category={BEDROOMS}
                                selectedRoomFilters={selectedRoomFilters[BEDROOMS]}
                                handleRoomFilterClick={handleRoomFilterClick}
                            />
                        </div>

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
