
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
    getDefaultGuests,
    getDefaultRegion,
}
window.cs = stayService


async function query(filterBy, selectedLabel) {
    return httpService.post(`stay/getAll`, { filterBy, selectedLabel })
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
    return {
        location: '',
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

function getDefaultGuests() {
    return {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    }
}



