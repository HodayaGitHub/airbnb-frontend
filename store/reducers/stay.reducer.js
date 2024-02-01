import { stayService } from "../../services/stay.service.js"


export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const APPEND_STAYS = 'APPEND_STAYS'
export const UPDATE_STAY = 'UPDATE_STAY'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_FILTER_LABEL = 'SET_FILTER_LABEL'


const initialState = {
    stays: [],
    lastRemovedStay: null,
    filterBy: stayService.getDefaultSearchFilter(),
    selectedLabel: '',
    page: 1,
    totalDocumentsCount: 0,
}

export function stayReducer(state = initialState, action) {
    var newState = state
    var stays


    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays, page: action.page, totalDocumentsCount: action.totalDocumentsCount}
            break
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays, lastRemovedStay }
            break
        case ADD_STAY:
            stays = [...state.stays, action.stay]
            newState = { ...state, stays }
            break
        case APPEND_STAYS:
            newState = { ...state, stays: [...state.stays, ...action.stays] }
            break
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        case UNDO_REMOVE_STAY:
            if (state.lastRemovedStay) {
                newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }}
            break
        case SET_FILTER_BY:
            newState = { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
            break
        case SET_FILTER_LABEL:
            newState = { ...state, selectedLabel: action.selectedLabel }
            break
        default:
            break
    }
    return newState
}
