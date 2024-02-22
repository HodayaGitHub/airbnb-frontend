import { userService } from '../../services/user.service.js'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const UPDATE_USER = 'UPDATE_USER'


const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            console.log('SET_USER action dispatched:', action);
            newState = { ...state, loggedInUser: action.user }
            break
        case UPDATE_USER:
            newState = {
                ...state, loggedInUser: { ...state.loggedInUser, favoriteStays: action.user.favoriteStays, },
            };
            break;

        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break

        default:
            break

    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
