import { stayService } from '../../services/stay.service.js'
// import { stayService } from '../../services/stay.service.local.js'

import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { SET_STAY_ADDED , APPEND_STAYS, ADD_STAY, REMOVE_STAY, SET_STAYS, UNDO_REMOVE_STAY, UPDATE_STAY, SET_FILTER_BY, SET_FILTER_LABEL } from '../reducers/stay.reducer.js'
import { SET_SCORE } from '../reducers/user.reducer.js'
import { LOADING_START, LOADING_DONE } from '../reducers/system.reducer.js'

const ITEMS_PER_PAGE = 24

// Action Creators:
export function getActionRemoveStay(stayId) {
    return {
        type: REMOVE_STAY,
        stayId
    }
}
export function getActionAddStay(stay) {
    return {
        type: ADD_STAY,
        stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}

export async function loadStays(filterBy, shouldLoadMore) {
    try {
        store.dispatch({ type: LOADING_START, isLoading: true })
        const page = shouldLoadMore ? store.getState().stayModule.page + 1 : 1
        const response = await stayService.query(filterBy, page, ITEMS_PER_PAGE)
        console.log(response.stays)
        const newStays = Array.isArray(response.stays) ? response.stays : []
        store.dispatch({
            type: SET_STAYS,
            stays: shouldLoadMore ? [...store.getState().stayModule.stays, ...newStays] : [...newStays],
            page: page,
            totalDocumentsCount: response.totalDocumentsCount,
        })
    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    } finally {
        store.dispatch({ type: LOADING_DONE, isLoading: false })
    }
}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getActionRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
        throw err
    }
}

export async function addStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        console.log('Added Stay', savedStay)
        store.dispatch(getActionAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}


export function updateStay(stay) {
    return stayService.save(stay)
        .then(savedStay => {
            console.log('Updated Stay:', savedStay)
            store.dispatch(getActionUpdateStay(savedStay))
            return savedStay
        })
        .catch(err => {
            console.log('Cannot save stay', err)
            throw err
        })
}



export async function checkout(total) {
    try {
        const score = await userService.changeScore(-total)
        store.dispatch({ type: SET_SCORE, score })
        return score
    } catch (err) {
        console.log('StayActions: err in checkout', err)
        throw err
    }
}


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveStayOptimistic(stayId) {
    store.dispatch({
        type: REMOVE_STAY,
        stayId
    })
    showSuccessMsg('Stay removed')

    stayService.remove(stayId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully')
        })
        .catch(err => {
            showErrorMsg('Cannot remove stay')
            console.log('Cannot load stays', err)
            store.dispatch({
                type: UNDO_REMOVE_STAY,
            })
        })
}


// filtering
export function setFilterBy(filterBy) {
    return store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSelectedLabel(selectedLabel) {
    return store.dispatch({ type: SET_FILTER_LABEL, selectedLabel })
}


