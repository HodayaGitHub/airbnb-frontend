import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import _debounce from 'lodash/debounce';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FilterIcon, TopTierIcon } from '../../services/icons.service.jsx';
import { PriceRange } from './PriceRange.jsx';
import { RoomsBeds } from './RoomsBeds.jsx';
import { stayService } from '../../services/stay.service.js';


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
    const [totalStays, setTotalStays] = useState(totalDocumentsCount)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy, roomType: ANY_TYPE })
    const [selectedRoomFilters, setSelectedRoomFilters] = useState({
        [BEDROOMS]: 'Any',
        [BEDS]: 'Any',
        [BATHROOMS]: 'Any',
    });

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    useEffect(() => {
        // onSetFilter({ ...filterByToEdit })
        async function getplacesCount() {
            try {
                const totalStaysRes = await stayService.query({ ...filterByToEdit })
                setTotalStays(totalStaysRes.totalDocumentsCount)
                return totalStaysRes
            } catch (err) {
                console.log(err)
            }
        }
        getplacesCount()
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

    function clearAll() {
        setFilterByToEdit(stayService.getDefaultSearchFilter());
    }

    function showPlaces() {
        onSetFilter({ ...filterByToEdit })
        handleClose()
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
                                <h5>Type of place</h5>
                                <span>Search rooms, entire homes, or any type of place.</span>
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
                                <h5>Rooms and beds</h5>
                            </span>

                            <RoomsBeds
                                category={BEDROOMS}
                                selectedRoomFilters={selectedRoomFilters[BEDROOMS]}
                                handleRoomFilterClick={handleRoomFilterClick}
                            />
                            <RoomsBeds
                                category={BEDS}
                                selectedRoomFilters={selectedRoomFilters[BEDS]}
                                handleRoomFilterClick={handleRoomFilterClick}
                            />
                            <RoomsBeds
                                category={BATHROOMS}
                                selectedRoomFilters={selectedRoomFilters[BATHROOMS]}
                                handleRoomFilterClick={handleRoomFilterClick}
                            />

                        </div>

                        <section>
                            <h5>Top-tier stays</h5>
                            <div className={`top-tier-container ${filterByToEdit.guestFavorite ? 'active' : ''}`} onClick={GuestFavorites}>
                                <div className='top-tier-details'>
                                    <TopTierIcon />
                                    <div className='top-tier-desc'>
                                        <h5> Guest favorites</h5>
                                        <span>The most loved homes on Airbnb, according to guests</span>
                                    </div>
                                </div>

                            </div>
                        </section>

                        <div className='clear-total-container'>
                            <button onClick={clearAll}>Clear all</button>
                            <button onClick={showPlaces}>{`Show ${totalStays} places`}</button>
                        </div>

                    </section>

                </Box>
            </Modal>

        </div>
    )
}
