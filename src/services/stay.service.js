
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getDefaultSearchFilter,
    getDefaultSearchFilter,
    getDefaultGuests,
    getDefaultRegion,
}
window.cs = stayService


async function query(filterBy, selectedLabel) {
    return httpService.post(`stay/getAll`, {filterBy, selectedLabel })
async function query(filterBy, selectedLabel) {
    return httpService.post(`stay/getAll`, {filterBy, selectedLabel })
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}


function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

// Filtring:
function getDefaultSearchFilter() {
function getDefaultSearchFilter() {
    return {
        location: '',
        location: '',
        stayDates: '',
        checkIn: '',
        checkOut: '',
        guests: getDefaultGuests(),
        region: '', 
    }
}
        guests: getDefaultGuests(),
    }
}


function getDefaultRegion() {
    return [
        'Flexible',
        'Middle East',
        'Greece',
        'Italy',
        'Asia',
        'Flexible',
        'Middle East',
        'Greece',
        'Italy',
        'Asia',
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


