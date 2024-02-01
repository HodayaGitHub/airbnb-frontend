import { stayService } from "../../services/stay.service.js"


export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_GUESTS = 'SET_GUESTS'


const initialState = {
    stays: [],
    cart: [],
    lastRemovedStay: null,
    filterBy: stayService.getDefaultFilter(),
    guests: stayService.getDefaultGuests(),
}

export function stayReducer(state = initialState, action) {
    var newState = state
    var stays
    var cart

    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays }
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
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        case ADD_TO_CART:
            newState = { ...state, cart: [...state.cart, action.stay] }
            break
        case REMOVE_FROM_CART:
            cart = state.cart.filter(stay => stay._id !== action.stayId)
            newState = { ...state, cart }
            break
        case CLEAR_CART:
            newState = { ...state, cart: [] }
            break
        case UNDO_REMOVE_STAY:
            if (state.lastRemovedStay) {
                newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
            }
            break

        // case SET_GUESTS:
        //     return { ...state, guests: { ...state.guests, ...action.guests } }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        default:
    }
    return newState
}
