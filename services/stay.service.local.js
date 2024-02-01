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
  getLocalLabels,
  generateQueryString,
  totalGuests,
  buildQueryParams,
  getDefaultDates,
  daysBetweenDates,
}

window.cs = stayService

async function query(filterBy) {
  var stays = await storageService.query(STORAGE_KEY)
  if (filterBy?.region && filterBy.region !== `I'm flexible`) {
    stays = stays.filter((stay) => stay.loc.country === filterBy.region)
  }
  if (filterBy?.guests) {

    stays = stays.filter((stay) => stay.capacity >= totalGuests(filterBy))
  }

  if (filterBy?.label) {
    stays = stays.filter((stay) => stay.labels?.includes(filterBy.label))
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

function getAmentities() {
  return AMENTITIES
}


// filtering :
function getDefaultSearchFilter() {
  return {
    stayDates: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    region: '',
    label: ''
  }
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

function guestParams(guests) {
  const queryString = Object.keys(guests)
    .map((key) => {
      const param = guests[key];
      return `${key}=${param}`;
    })
    .join('&')
  return queryString
}

function buildQueryParams(filterBy) {
  const { region, checkIn, checkOut, guests, label } = filterBy
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


function daysBetweenDates(firstDate, secondDate) {
  // Calculate the time difference in milliseconds
  const date1 = new Date(firstDate)
  const date2 = new Date(secondDate)
  const timeDifference = date2.getTime() - date1.getTime();

  // Convert the time difference to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

  return daysDifference;
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
