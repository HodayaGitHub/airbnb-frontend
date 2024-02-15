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
    fetchAvatar,
    calculateAverageRating,
    getStaysPrices,
    loadStaysPrices,
    // loadStay,
}

// for cookies
const axios = Axios.create({
    withCredentials: true
})


window.cs = stayService
const BASE_URL = 'stay'

function query(filterBy = {}, page = 1) {
    return httpService.get(BASE_URL, { filterBy, page })
}

function getStaysPrices(){
    return httpService.get(`stay/prices`)

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


// filtering services :
function getDefaultSearchFilter() {
    return {
        stayDates: '',
        checkIn: '',
        checkOut: '',
        guests: getDefaultGuests(),
        region: '',
        label: '',
        roomType: '',
        price: { minPrice: 0, maxPrice: 3500 },
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
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/everywhere.png'
        },
        {
            name: 'Brazil',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/brazil.png'
        },
        {
            name: 'Australia',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/Australia.png'
        },
        {
            name: 'United States',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1707212846/airbnb/region/united-states.png'
        },
        {
            name: 'Italy',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1707212846/airbnb/region/italy.png'
        },
        {
            name: 'Spain',
            imgUrl: 'https://res.cloudinary.com/drlt4yjnj/image/upload/v1704657005/airbnb/region/spain.png'
        },
    ];
};

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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const defaultCheckIn = Math.floor(today.getTime());

    const oneDayInSeconds = 24 * 60 * 60;
    const defaultCheckOut = defaultCheckIn + oneDayInSeconds;

    // console.log(defaultCheckIn, defaultCheckOut);

    console.log('defaultCheckIn', defaultCheckIn);
    console.log('defaultCheckOut', defaultCheckOut);

    return {
        defaultCheckIn,
        defaultCheckOut,
    };
}

function totalGuests(filterBy) {
    const { adults, children, infants } = filterBy.guests
    let totalGuests = adults + children + infants
    return totalGuests
}

function getLabels() {
    return labels
}

// StayDetails services: 


function calcNights(firstDate, secondDate) {
    const timeDifference = secondDate - firstDate;
    const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60)); // seconds to days

    return daysDifference;
}

async function fetchAvatar() {
    try {
        const gender = Math.random() < 0.5 ? 'men' : 'women';
        const imgId = Math.floor(Math.random() * 20) + 1;
        const url = `https://randomuser.me/api/portraits/thumb/${gender}/${imgId}.jpg`;
        return url;
    } catch (error) {
        console.error('Error fetching avatar:', error);
        throw error;
    }
}


function calculateAverageRating(stay) {
    if (!stay || !stay.reviews || stay.reviews.length === 0) {
        return 0
    }

    const totalRating = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    return totalRating / stay.reviews.length
}

async function loadStaysPrices() {
    try {
      const staysPrice = await stayService.getStaysPrices()
      console.log(staysPrice)
    } catch (err) {
      console.log('Cannot load prices', err)
      throw err

    }
  }