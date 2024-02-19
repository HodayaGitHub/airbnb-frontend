import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useSearchParams } from "react-router-dom"
import classnames from 'classnames'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.js'
import { loadStays, addStay, updateStay, removeStay, setFilterBy } from '../store/actions/stay.actions.js'
import { MainHeader } from '../cmps/MainHeader.jsx'
import { MainHeaderOnScroll } from '../cmps/MainHeaderOnScroll.jsx'

import { StayList } from '../cmps/StayList.jsx'
import { StaySearch } from '../cmps/search/StaySearch.jsx'
import { StayFilter } from '../cmps/filter/StayFilter.jsx'
import { LabelsFilter } from '../cmps/filter/LabelsFilter.jsx'
import { ShowMoreStays } from '../cmps/ShowMoreStays.jsx'


export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const [searchParams, setSearchParams] = useSearchParams()
    const [params, setParams] = useState(stayService.generateQueryString(filterBy))


    const [loadingMore, setLoadingMore] = useState(false)
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerClassNames = classnames({
        'sticky': scrollPosition > 20,
    })

    useEffect(() => {
        loadStays(filterBy, false);
    }, [filterBy]);



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
            <div className={`header-wrapper full main-layout ${headerClassNames}`}>

                {headerClassNames ? (
                    <MainHeaderOnScroll
                        filterBy={filterBy}
                        onSetFilter={onSetFilter} />
                ) : (
                    <>
                        <MainHeader />
                        <StaySearch
                            filterBy={filterBy}
                            onSetFilter={onSetFilter}
                        />
                    </>
                )}

                <div className={` filter-labels-container`}>
                    <LabelsFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <StayFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                </div>
            </div>



            {isLoading && initialLoad ? (
                <div className='stay-index-loader'>
                    <div className='loader'></div>
                </div>
            ) : (
                <>
                    <StayList params={params} stays={stays} onRemoveStay={onRemoveStay} />
                    <ShowMoreStays onLoadMore={onLoadMore} />
                </>
            )}



        </>

    );
}