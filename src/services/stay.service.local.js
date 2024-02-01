
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


import { labels } from '../data/labels.js'
import { stays } from '../data/stays.js'


const STORAGE_KEY = 'stay'
const LABELS_KEY = 'labels'

const AMENTITIES = {
  Essentials: ['Wifi', 'Washer', 'Air conditioning', 'Dedicated workspace', 'Hair dryer', 'Kitchen', 'Dryer', 'Heating', 'TV', 'Iron'],
  Features: ['Pool', 'Free parkring', 'Crib', 'Gym', 'Breakfast', 'smoking allowed', 'Hot tub', 'EV charger', 'King bed', 'BBQ grill', 'Indoor fireplace'],
  Location: ['Beachfront', 'Waterfront'],
  Safty: ['Smoke alarm', 'Carbon monoxide alarm']
}


export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  getDefaultFilter,
  getAmentities,
  getLabels,
}

window.cs = stayService

async function query(filterBy = { where: '', checkIn: '', checkOut: '', who: '' }) {
  var stays = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
  }
  if (filterBy.price) {
    stays = stays.filter(stay => stay.price <= filterBy.price)
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
    price: '',
    roomCount: '',
    bedCount: '',
    bathroomCounts: '',
    summary: '',
    capacity: '',
    amenities: {
      Essentials: [],
      Features: [],
      Location: [],
      Safty: []
    },
    labels: [],
    host: {},
    loc: {},
    reviews: []
  }
}

// Filtring:
function getDefaultFilter() {
  return { where: '', stayDates: '', checkIn: '', checkOut: '', who: '' }
}

function getAmentities() {
  return AMENTITIES
}


async function getLabels() {
  try {
    const labels = await storageService.query(LABELS_KEY)
    return labels
  } catch (error) {
    console.error('Error getting labels:', error)
    throw error;
  }
}



// TEST DATA


// storageService.addEntities(STORAGE_KEY, stays)
// storageService.addEntities(LABELS_KEY, labels)







// const stay = {
//   _id: "s101",
//   name: "Ribeira Charming Duplex",
//   type: "House",
//   imgUrls: ["https://res.cloudinary.com/drlt4yjnj/image/upload/v1704278755/airbnb/stay1/img1.png",
//     "https://res.cloudinary.com/drlt4yjnj/image/upload/v1704278755/airbnb/stay1/img2.png",
//     "https://res.cloudinary.com/drlt4yjnj/image/upload/v1704278755/airbnb/stay1/img3.png",
//     "https://res.cloudinary.com/drlt4yjnj/image/upload/v1704278755/airbnb/stay1/img4.png",
//     "https://res.cloudinary.com/drlt4yjnj/image/upload/v1704278755/airbnb/stay1/img5.png",
//   ],
//   price: 80.00,
//   summary: "Fantastic duplex apartment...",
//   capacity: 8,
//   amenities: [
//     "TV",
//     "Wifi",
//     "Kitchen",
//     "Smoking allowed",
//     "Pets allowed",
//     "Cooking basics"
//   ],
//   labels: [
//     "Top of the world",
//     "Trending",
//     "Play",
//     "Tropical"
//   ],
//   host: {
//     _id: "u101",
//     fullname: "Davit Pok",
//     imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//   },
//   loc: {
//     country: "Portugal",
//     countryCode: "PT",
//     city: "Lisbon",
//     address: "17 Kombo st",
//     lat: -8.61308,
//     lng: 41.1413
//   },
//   reviews: [
//     {
//       id: "madeId",
//       txt: "Very helpful hosts. Cooked traditional...",
//       rate: 4,
//       by: {
//         _id: "u102",
//         fullname: "user2",
//         imgUrl: "/img/img2.jpg"
//       }
//     }
//   ],
//   likedByUsers: ["mini-user"]
// }

