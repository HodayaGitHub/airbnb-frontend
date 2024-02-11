import { storageService } from "./async-storage.service"
import Axios from 'axios'
import { httpService } from './http.service.js'
import { addOrder, updateOrder } from '../store/actions/order.actions.js';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    daysCount,
    fixTime,
    convertDateStringToUnix,
    parseGuestParams,
    getDatesfromParams,
    createOrder,
}

// for cookies
const axios = Axios.create({
    withCredentials: true
})


window.cs = orderService

async function query(filterBy) {
    var orders = await storageService.query(STORAGE_KEY)
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
    // throw new Error('Nope')
}

// async function save(order) {
//     var savedOrder
//     if (order._id) {
//         savedOrder = await storageService.put(STORAGE_KEY, order)
//     } else {
//         savedOrder = await storageService.post(STORAGE_KEY, order)
//     }
//     return savedOrder
// }

function getEmptyOrder() {

    return {
        hostId: "",
        buyer: {
            _id: "",
            fullname: ""
        },
        totalPrice: 0,
        checkIn: defaultCheckIn,
        checkOut: defaultCheckOut,
        guests: {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0
        },
        stayId: "",
        stayImg: "",
        status: "pending"
    }
}

function daysCount(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const timeDifference = Math.abs(date2 - date1);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

function fixTime() {
    let time = new Date(Date.now())
    if (!isNaN(time.getTime())) {
        var day = ("0" + time.getDate()).slice(-2);
        var month = ("0" + (time.getMonth() + 1)).slice(-2);
        var year = time.getFullYear().toString().slice(-2);
        time = day + '/' + month + '/' + year;
    }
    return time
}


function save(order) {
    return httpService.post(`order`, order)
}



function convertDateStringToUnix(dateString) {
    // Assuming dateString is in the format "YY/MM/DD"
    const dateParts = dateString.split('/');
    const year = parseInt(dateParts[0], 10) + 2000; // Assuming it's in the 21st century
    const month = parseInt(dateParts[1], 10) - 1; // Month is zero-based
    const day = parseInt(dateParts[2], 10);

    const dateObject = new Date(year, month, day);
    const unixTimestamp = Math.floor(dateObject.getTime() / 1000);

    return unixTimestamp;
}


function getDatesfromParams() {
    const { defaultCheckIn, defaultCheckOut } = stayService.getDefaultDates();
    const searchParams = new URLSearchParams(location.search);
    let checkIn = decodeURIComponent(searchParams.get('checkIn'));
    let checkOut = decodeURIComponent(searchParams.get('checkOut'));

    if (checkIn === 'Invalid Date' || !checkIn) {
        checkIn = defaultCheckIn;
    }

    if (checkOut === 'Invalid Date' || !checkOut) {
        checkOut = defaultCheckOut;
    }

    return { checkIn, checkOut };
}


function parseGuestParams(guestParam) {
    const guests = queryString.parse(guestParam);
    guests.adults = +guests.adults || 1;
    guests.children = +guests.children || 0;
    guests.infants = +guests.infants || 0;
    guests.pets = +guests.pets || 0;
    return guests;
}


function createOrder(stay) {
    const location = useLocation();
    localStorage.removeItem('PRE_ORDER');
    const searchParams = new URLSearchParams(location.search);
    const guestParam = decodeURIComponent(searchParams.get('guestParam'));
    const guests = orderService.parseGuestParams(guestParam);
    const { defaultCheckIn, defaultCheckOut } = orderService.getDefaultDates();

    const order = {
        checkIn: defaultCheckIn,
        checkOut: defaultCheckOut,
        hostId: stay.host._id,
        hostName: stay.host.fullname,
        hostPic: stay.host.pictureUrl,
        totalNights: stayService.calcNights(checkIn, checkOut),
        guests,
        stayId,
        stayLoc: stay.loc.country,
        stayImg: stay.imgUrls[0],
        totalGuests: guests.adults + guests.children,
        price: stay.price * nights,
        status: 'Pending',
        imgUrl: "https://res.cloudinary.com/drlt4yjnj/image/upload/v1705352677/qwplqesdakcgpkpjnpf5.jpg",
        guestImg: loggedInUser.imgUrl,
        name: loggedInUser.fullname,
    };

    addOrder(order);
}
