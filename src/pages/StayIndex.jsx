import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addToCart, setFilterBy, setGuestsCount } from '../store/actions/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
// import { stayService } from '../services/stay.service.js'
import { stayService } from '../services/stay.service.local.js'

import { StayList } from '../cmps/StayList.jsx'
import { StayFilter } from '../cmps/filtring/StayFilter.jsx'


export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const isLoading = useSelector(storeState => storeState.userModule.isLoading)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const guests = useSelector(storeState => storeState.stayModule.guests)

    useEffect(() => {
        loadStays()
    }, [filterBy])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.vendor = prompt('Vendor?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
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
        // console.log('filterBy:', filterBy)
        setFilterBy(filterBy)
    }

    function onSetGuestsCount(guests) {
        setGuestsCount(guests)
        console.log(guests)
    }


    return (
        <div>
            <StayFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
                guests={guests}
                onSetGuestsCount={onSetGuestsCount} />

            <main>
                {isLoading && 'Loading...'}
                <StayList
                    stays={stays}

                />
            </main>
        </div>
    )
}