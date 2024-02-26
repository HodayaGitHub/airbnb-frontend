import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { loadStays, removeStay, setFilterBy } from '../store/actions/stay.actions.js'
import { MainHeader } from '../cmps/MainHeader.jsx'
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
    const [initialLoad, setInitialLoad] = useState(true);
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        loadStays(filterBy, false);
    }, [filterBy]);

    const handleScroll = () => {
        setIsTop(window.scrollY === 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            <div className={`header-wrapper full main-layout ${!isTop ? 'scroll' : ''}`}>
                <>
                    <MainHeader
                        isTop={isTop}
                        filterBy={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    {isTop && (
                        <StaySearch
                            filterBy={filterBy}
                            onSetFilter={onSetFilter}
                        />
                    )}
                </>
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