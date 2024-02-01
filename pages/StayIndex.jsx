import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useSearchParams } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.js'
import { loadStays, addStay, updateStay, removeStay, setFilterBy } from '../store/actions/stay.actions.js'

import { StayList } from '../cmps/StayList.jsx'
import { StaySearch } from '../cmps/search/StaySearch.jsx'
import { StayFilter } from '../cmps/filter/StayFilter.jsx'
import { LabelsFilter } from '../cmps/filter/LabelsFilter.jsx'
import { AutoCompleteCmp } from '../cmps/search/AutoCompleteCmp.jsx'
import { Restcountries } from '../cmps/search/Restcountries.jsx'
import { ShowMoreStays } from '../cmps/ShowMoreStays.jsx'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const isLoading = useSelector(storeState => storeState.userModule.isLoading)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    
    const [searchParams, setSearchParams] = useSearchParams()
    const [params, setParams] = useState(stayService.generateQueryString(filterBy))
    
    const [loadingMore, setLoadingMore] = useState(false)
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 30)
        })
    }, [])

    useEffect(() => {
        loadStays(filterBy, false)
    }, [filterBy])


    async function onLoadMore() {
        if (!loadingMore) {
            try {
                setLoadingMore(true)
                await loadStays(filterBy, true)
            } catch (err) {
                console.error('Error loading more stays', err)
            } finally {
                setLoadingMore(false)
            }
        }
    }

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

            <div className={`filter-labels-container ${scroll ? "sticky full" : ""}`}>
                <LabelsFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                />

                <StayFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                    setFilterBy={setFilterBy}
                />

            </div >

            {/* <button> <Link className='add-btn' to={`/edit`}>Add</Link></button> */}

            {isLoading && 'Loading...'}
            <StayList
                params={params}
                stays={stays}
                onRemoveStay={onRemoveStay}
            />
            {isLoading && <div> loading........</div>}
            < ShowMoreStays onLoadMore={onLoadMore} />
        </>
    )
}