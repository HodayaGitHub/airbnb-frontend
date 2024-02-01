
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
    calcNights,
    formatDateFromUnix,
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

function save(stay) {
    return httpService.put(BASE_URL, stay)
}

async function addMsg(stayId, txt) {
    const savedMsg = await httpService.post(`toy/${stayId}/msg`, { txt })
    return savedMsg
}

async function removeMsg(stayId, msgId) {
    const removedId = await httpService.delete(`toy/${stayId}/msg/${msgId}`)
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
function formatDateFromUnix(unixTimestamp) {
    const options = { day: 'numeric', month: 'short' };
    const formattedDate = new Date(unixTimestamp * 1000).toLocaleDateString('en-US', options);
    return formattedDate;
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
        checkIn: checkIn || defaultCheckIn,
        checkOut: checkOut || defaultCheckOut,
        guests: totalGuests(filterBy) || 1,
        label: label,
    }
    return params
}

function getDefaultDates() {
    const today = new Date()
    const defaultCheckIn = Math.floor(Date.now() / 1000)
    const oneDayInSeconds = 24 * 60 * 60
    const defaultCheckOut = defaultCheckIn + oneDayInSeconds

    return {
        defaultCheckIn,
        defaultCheckOut,
    }
}

function totalGuests(filterBy) {
    const { adults, children, infants } = filterBy.guests
    let totalGuests = adults + children + infants
    return totalGuests
}



function getLabels() {
    return labels
}
function calcNights(firstDate, secondDate) {
    const timeDifference = secondDate - firstDate;
    const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60)); // seconds to days
  
    return daysDifference;
  }