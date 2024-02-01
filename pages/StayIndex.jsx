import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useSearchParams } from "react-router-dom"

import { loadStays, addStay, updateStay, removeStay, addToCart, setFilterBy } from '../store/actions/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.local.js'
// import { stayService } from '../services/stay.service.js'

import { StayList } from '../cmps/StayList.jsx'
import { StaySearch } from '../cmps/search/StaySearch.jsx'
import { StayFilter } from '../cmps/filter/StayFilter.jsx'
import { LabelsFilter } from '../cmps/filter/LabelsFilter.jsx'
import { AutoCompleteCmp } from '../cmps/search/AutoCompleteCmp.jsx'
import { Restcountries } from '../cmps/search/Restcountries.jsx'


export function StayIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const isLoading = useSelector(storeState => storeState.userModule.isLoading)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [params, setParams] = useState(stayService.generateQueryString(filterBy))
    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }


    async function onUpdateStay(stay) {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    function onAddToCart(stay) {
        console.log(`Adding ${stay.vendor} to Cart`)
        addToCart(stay)
        showSuccessMsg('Added to Cart')
    }

    function onAddStayMsg(stay) {
        console.log(`TODO Adding msg to stay`)
        try {
            showSuccessMsg(`Stay msg added, it now has: ${3}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }

    }

    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return stay.owner?._id === user._id
    }


    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
        setSearchParams(stayService.buildQueryParams(filterBy))
        setParams(stayService.generateQueryString(filterBy))

    }

    function onRemoveStay(stayId) {
        try {
            removeStay(stayId)
        }
        catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    return (
        <>
            <StaySearch
                filterBy={filterBy}
                onSetFilter={onSetFilter}
            />

            <div className="filter-labels-container">
                <LabelsFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                />
                <StayFilter />
            </div >

            <button> <Link className='add-btn' to={`/edit`}>Add</Link></button>

            {isLoading && 'Loading...'}
            <StayList
                params={params}
                stays={stays}
                onRemoveStay={onRemoveStay}
            />
        </>
    )
}