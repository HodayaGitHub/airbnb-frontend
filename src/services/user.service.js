import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  getByUsername,
  remove,
  update,
  changeScore,
  removeLoacalUserFromSession,
  getEmptyCredentials,
  save,
  fetchRandomAvatar,
}

window.userService = userService

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

async function getById(userId) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/${userId}`)
  return user
}

async function getByUsername(username) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/username/${username}`)
  return user
}


function remove(userId) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${user._id}`)
}

function save(user) {
  return httpService.put(`user/${user._id}`, user)
}

async function update(user) {
  // let user = await httpService.get('user', _id)
  await httpService.put(`user/${user._id}`, user)

  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  const user = await httpService.post('auth/login', userCred)
  if (user) return saveLocalUser(user)
}

async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  // userCred.score = 10000
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}

async function logout() {
  // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    imgUrl: user.imgUrl,
    favoriteStays: user.favoriteStays,
    myOrder: user.myOrders,
    myGuests: user.myGuests,

  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function removeLoacalUserFromSession() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
  return {
    fullname: '',
    username: '',
    password: '',
    email: 'email@email.com',
    imgUrl: '../assets/img/host-img/anonumus-user.png',
    favoriteStays: [],
    myOrders: [],
    myGuests: [],
  }
}

async function fetchRandomAvatar () {
  try {
    // Generate a random gender ('male' or 'female')
    const gender = Math.random() < 0.5 ? 'male' : 'female';

    // Generate a random image ID (assuming the range is 1 to 99)
    const imgId = Math.floor(Math.random() * 99) + 1;

    const response = await fetch(`https://randomuser.me/api/?gender=${gender}`);
    const data = await response.json();
    const user = data.results[0];

    return `https://randomuser.me/api/portraits/${gender}/${imgId}.jpg`;
  } catch (error) {
    console.error('Error fetching random avatar:', error);
    return ''; // Return a default value or handle the error as needed
  }
};


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',email: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', email: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', email: 10000})
// })()
