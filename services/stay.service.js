
// import { storageService } from './async-storage.service.js'

import Axios from 'axios'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getDefaultSearchFilter,
    getDefaultGuests,
    getDefaultRegion,
    generateQueryString,
    totalGuests,
    buildQueryParams,
    getDefaultDates,
    addMsg,
    removeMsg,
}

// for cookies
const axios = Axios.create({
    withCredentials: true
})


window.cs = stayService
const BASE_URL = 'stay'


// async function query(filterBy) {
//     return httpService.post(`stay`, filterBy)
// }


function query(filterBy = {}) {
    return httpService.get(BASE_URL, { filterBy })
}


// async function query(filterBy, selectedLabel) {
//     return httpService.post(`stay`, { filterBy, selectedLabel })
// }

// async function query() {
//     return httpService.get(`stay`)
// }


function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}

function save(toy) {
    return httpService.put(BASE_URL, toy)
}

async function addMsg(toyId, txt) {
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
    return savedMsg
}

async function removeMsg(toyId, msgId) {
    const removedId = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
    return removedId
}



// filtering :
function getDefaultSearchFilter() {
    return {
        stayDates: '',
        checkIn: '',
        checkOut: '',
        guests: getDefaultGuests(),
        region: '',
        label: '',
    }
}

function getDefaultRegion() {
    return [
        {
            name: `I'm flexible`,
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/united-states.png'
        },
        {
            name: 'Middle East',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/middle-east.png'
        },
        {
            name: 'Greece',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/greece.png'
        },
        {
            name: 'United States',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/united-states.png'
        },
        {
            name: 'Italy',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/italy.png'
        },
        {
            name: 'Southeast Asia',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/southeast-asia.png'
        },
    ]
}

// function getDefaultGuests() {
//     return {
//         adults: 0,
//         children: 0,
//         infants: 0,
//         pets: 0,
//     }
// }

function getDefaultGuests() {
    return {
        adults: {
            count: 0,
            desc: 'Ages 13 or above',
        },
        children: {
            count: 0,
            desc: 'Ages 2-12',
        },
        infants: {
            count: 0,
            desc: 'Under 2',
        },
        pets: {
            count: 0,
            desc: 'Bringing a service animal?',
        },
    }
}

function generateQueryString(filterBy) {
    const { stayDates, checkIn, checkOut, guests, region, label } = filterBy
    const queryParams = { stayDates, checkIn, checkOut, guests, region, label }
    const queryString = new URLSearchParams(queryParams).toString()
    return queryString
}

function getFormattedDate(date) {
    if (date instanceof Date) {
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })
    }
    return ''
}

function buildQueryParams(filterBy) {
    const { region, checkIn, checkOut, guests, label } = filterBy
    const { defaultCheckIn, defaultCheckOut } = getDefaultDates()
    console.log(defaultCheckIn)
    const params = {
        region: region || `I'm flexible`,
        checkIn: getFormattedDate(checkIn) || getFormattedDate(defaultCheckIn),
        checkOut: getFormattedDate(checkOut) || getFormattedDate(defaultCheckOut),
        guests: totalGuests(filterBy) || 1,
        label: label,
    }
    return params
}

function getDefaultDates() {
    const today = new Date()
    const defaultCheckIn = new Date(today.toISOString())
    const defaultCheckOut = new Date(today)
    defaultCheckOut.setDate(today.getDate() + 1)
    return {
        defaultCheckIn,
        defaultCheckOut,
    }
}

function totalGuests(filterBy) {
    const { adults, children, infants } = filterBy.guests
    return adults.count + children.count + infants.count
}



