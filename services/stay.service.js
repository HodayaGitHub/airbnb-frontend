
// import { storageService } from './async-storage.service.js'

import Axios from 'axios'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { labels } from '../data/labels.js'

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
    getLabels,
    daysBetweenDates,
}

// for cookies
const axios = Axios.create({
    withCredentials: true
})


window.cs = stayService
const BASE_URL = 'stay'

function query(filterBy = {}, page = 1, itemsPerPage) {
    return httpService.get(BASE_URL, { filterBy, page, itemsPerPage, })
}

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
        roomType: '',
        price: { minPrice: -Infinity, maxPrice: Infinity },
        bedrooms: null,
        beds: null,
        bathrooms: null,
        guestFavorite: false,
    }
}

function getDefaultRegion() {
    return [
        {
            name: `I'm flexible`,
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/united-states.png'
        },
        {
            name: 'Brazil',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/middle-east.png'
        },
        {
            name: 'Australia',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/greece.png'
        },
        {
            name: 'United States',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/united-states.png'
        },
        {
            name: 'Portugal',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/italy.png'
        },
        {
            name: 'Turkey',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/southeast-asia.png'
        },
    ]
}

function getDefaultGuests() {
    return {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    }
}


function guestParams(guests) {
    const queryString = Object.keys(guests)
        .map((key) => {
            const param = guests[key]
            return `${key}=${param}`
        })
        .join('&')
    return queryString
}


function getFormattedDate(date) {
    if (date instanceof Date) {
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })
    }
    return ''
}

function generateQueryString(filterBy) {
    const { stayDates, checkIn, checkOut, guests, region, label } = filterBy
    const guestParam = guestParams(guests)
    const queryParams = { stayDates, checkIn, checkOut, guestParam, region, label }
    const queryString = new URLSearchParams(queryParams).toString()
    return queryString
}

function buildQueryParams(filterBy) {
    const { region, checkIn, checkOut, guests, label, } = filterBy
    const { defaultCheckIn, defaultCheckOut } = getDefaultDates()
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
    let totalGuests = adults + children + infants

    if (totalGuests === 0) {
        return 1
    }
    return totalGuests
}



function getLabels() {
    return labels
}

function daysBetweenDates(firstDate, secondDate) {
    // Calculate the time difference in milliseconds
    const date1 = new Date(firstDate)
    const date2 = new Date(secondDate)
    const timeDifference = date2.getTime() - date1.getTime();

    // Convert the time difference to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

    return daysDifference;
}