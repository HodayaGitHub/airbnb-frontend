import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

import { labels } from '../data/labels.js'
import { stays } from '../data/stays.js'
import { orders } from '../data/orders.js'

const STORAGE_KEY = 'stay'
const LABELS_KEY = 'labels'
const ORDERS_KEY = 'orders'

const AMENTITIES = {
  Essentials: [
    'Wifi',
    'Washer',
    'Air conditioning',
    'Dedicated workspace',
    'Hair dryer',
    'Kitchen',
    'Dryer',
    'Heating',
    'TV',
    'Iron'
  ],
  Features: [
    'Pool',
    'Free parkring',
    'Crib',
    'Gym',
    'Breakfast',
    'smoking allowed',
    'Hot tub',
    'EV charger',
    'King bed',
    'BBQ grill',
    'Indoor fireplace'
  ],
  Location: ['Beachfront', 'Waterfront', 'Ski-in', 'Ski-out'],
  Safty: [
    'Smoke alarm',
    'Carbon monoxide alarm',
    'Fire extinguisher',
    'First aid kit'
  ]
}

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  getDefaultSearchFilter,
  getAmentities,
  getLabels,
  initializeLocalStorage,
  getLocalLabels
}

window.cs = stayService

async function query(filterBy) {
  var stays = await storageService.query(STORAGE_KEY)
  if (filterBy?.location && filterBy.location.name !== `I'm flexible`) {
    stays = stays.filter((stay) => stay.loc.region === filterBy.location)
  }
  if (filterBy?.guests) {
    const totalGuests =
      filterBy.guests.adults +
      filterBy.guests.children +
      filterBy.guests.infants
    stays = stays.filter((stay) => stay.capacity >= totalGuests)
  }

  if (filterBy?.label){
    stays = stays.filter((stay) => stay.labels.includes(filterBy.label))
  }
  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    // Later, owner is set by the backend
    stay.host = userService.getLoggedinUser()
    savedStay = await storageService.post(STORAGE_KEY, stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.msgs) stay.msgs = []

  await storageService.put(STORAGE_KEY, stay)
  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function getEmptyStay() {
  return {
    name: '',
    type: '',
    imgUrls: [],
    privacy: '',
    price: '',
    roomCount: '',
    bedCount: '',
    bathroomCounts: '',
    summary: '',
    capacity: '',
    amentities: [],
    labels: [],
    host: {},
    loc: {},
    reviews: []
  }
}

// Filtring:
function getDefaultSearchFilter() {
  return {
    location: '',
    stayDates: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    region: '',
    label: '',

  }
}

function getAmentities() {
  return AMENTITIES
}

function getLocalLabels() {
  return labels
}

async function getLabels() {
  try {
    const labels = await storageService.query(LABELS_KEY)
    return labels
  } catch (error) {
    console.error('Error getting labels:', error)
    throw error
  }
}

// TEST DATA
async function initializeLocalStorage() {
  localStorage.setItem(STORAGE_KEY, null)
  localStorage.setItem(LABELS_KEY, null)
  localStorage.setItem(ORDERS_KEY, null)

  storageService.addEntities(STORAGE_KEY, stays)
  storageService.addEntities(LABELS_KEY, labels)
  storageService.addEntities(ORDERS_KEY, orders)
}

// initializeLocalStorage()
