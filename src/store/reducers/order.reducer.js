import { orderService } from "../../services/order.service.js"


export const SET_ORDER = 'SET_ORDER'
export const ADD_ORDER = 'ADD_ORDER'

const initialState = {
    order: null,
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var order

    switch (action.type) {
        case SET_ORDER:
            order = action.order
            newState = { ...state, order }
            break
        case ADD_ORDER:
            order = action.order
            newState = { ...state, order }
        default:
            break
    }
    return newState
}
