
const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    daysCount
}
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
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

function getEmptyOrder() {
    return {
        hostId: "",
        buyer: {
            _id: "",
            fullname: ""
        },
        totalPrice: 0,
        checkIn: "",
        checkOut: "",
        guests: {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0
        },
        stayId: "",
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
