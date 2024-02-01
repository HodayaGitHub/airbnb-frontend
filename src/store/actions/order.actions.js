import { store } from '../store.js'
import { ADD_ORDER, SET_ORDER } from '../reducers/order.reducer.js'


export function getActionAddOrder(order) {
    return {
        type: ADD_ORDER,
        order
    }
}
export function getActionSetOrder(order) {
    return {
        type: SET_ORDER,
        order
    }
}

export async function addOrder(order) {
    try {
        console.log('Added order', order)
        store.dispatch(getActionAddOrder(order))
        return order


    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}
export async function updateOrder(order) {
    try {
        console.log('Added order', order)
        store.dispatch(getActionSetOrder(order))
        return order
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}
