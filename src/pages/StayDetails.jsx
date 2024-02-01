import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import { stayService } from '../services/stay.service.js'
// import { stayService } from '../services/stay.service.local.js'
import { updateStay } from '../store/actions/stay.actions.js'

// HARD CODED
import img from '../assets/img/host-img/stay-host-img.jpg'
import reviewer1 from '../assets/reviewers-imgs/Emma-Johnson-img.jpg'
import key from '../assets/img/svgs/key.svg'
import share from '../assets/img/svgs/share.svg'
import heart from '../assets/img/svgs/heart.svg'
import chat from '../assets/img/svgs/chat.svg'
import locationImg from '../assets/img/svgs/location.svg'
import { ReservationModal } from '../cmps/reservationModal.jsx'
import { GoogleMap } from '../cmps/GoogleMap.jsx'
import { FavoriteIcon } from '../cmps/favoriteIcon.jsx'
import ShareModal from '../cmps/shareModal.jsx'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { addOrder, updateOrder } from '../store/actions/order.actions.js'
import { useSelector } from 'react-redux'
import { orderService } from '../services/order.service.js'
import { MainHeader } from '../cmps/MainHeader.jsx'
import { User } from 'react-feather'
import { userService } from '../services/user.service.js'
import { AMENTITIES } from '../data/stay.details.amentities.js'
import * as labelsSvg from '../services/labels.icons.service.jsx'
import * as React from 'react'


export function StayDetails() {
  // const [msg, setMsg] = useState(getEmptyMsg())
  const [stay, setStay] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('');
  const [reviewsToShow, setReviewsToShow] = useState(6);
  const { stayId } = useParams()
  const navigate = useNavigate()
  var order =
    useSelector((storeState) => storeState.orderModule.order) ||
    JSON.parse(localStorage.getItem('PRE_ORDER'))

  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser)


  const location = useLocation()
  useEffect(() => {
    const fetchAvatar = async () => {
      const url = await userService.fetchRandomAvatar()
      setAvatarUrl(url)
    }

    fetchAvatar()
  }, [])


  useEffect(() => {
    loadStay()
  }, [stayId])

  const { defaultCheckIn, defaultCheckOut } = stayService.getDefaultDates()

  function createOrder(stay) {
    localStorage.removeItem('PRE_ORDER')
    const searchParams = new URLSearchParams(location.search)
    let check_In = decodeURIComponent(searchParams.get('checkIn'))
    let check_Out = decodeURIComponent(searchParams.get('checkOut'))
    const guestParam = decodeURIComponent(searchParams.get('guestParam'))

    var guests = queryString.parse(guestParam)
    guests.adults = +guests.adults
    guests.children = +guests.children
    guests.infants = +guests.infants
    guests.pets = +guests.pets
    if (!guests.adults) guests.adults = 1
    const hostId = stay.host._id
    const hostName = stay.host.fullname
    const hostPic = stay.host.pictureUrl
    const guestImg = loggedInUser.imgUrl
    if (check_In === 'Invalid Date') {
      check_In = defaultCheckIn
    }
    if (check_Out === 'Invalid Date') {
      check_Out = defaultCheckOut
    }
    let count = guests.adults + guests.children
    const nights = stayService.calcNights(check_In, check_Out)
    const totalPrice = stay.price * nights
    const order = {
      check_In,
      check_Out,
      hostId,
      hostName,
      hostPic,
      totalNights: nights,
      guests,
      stayId,
      stayLoc: stay.loc.country,
      stayImg: stay.imgUrls[0],
      totalGuests: count,
      price: totalPrice,
      status: 'Pending',
      imgUrl: "https://res.cloudinary.com/drlt4yjnj/image/upload/v1705352677/qwplqesdakcgpkpjnpf5.jpg",
      guestImg,
      name: loggedInUser.fullname
    }
    addOrder(order)
  }

  function editOrder(order) {
    updateOrder(order)
  }

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
      if (!order) createOrder(stay)
    } catch (err) {
      navigate('/stay')
    }
  }
  function handleChange(target) {
    const field = target.name
    let value = target.value
    setStay((prevStay) => ({ ...prevStay, [field]: value }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (!stay.name) return
    onUpdate(stay)
  }

  async function onUpdate(stay) {
    try {
      await updateStay(stay)
      setIsEdit(false)
    } catch (err) {
      console.log('Cannot add stay', err)
    }
  }

  function calculateAverageRating() {
    if (!stay || !stay.reviews || stay.reviews.length === 0) {
      return 0
    }

    const totalRating = stay.reviews.reduce(
      (acc, review) => acc + review.rate,
      0
    )
    return totalRating / stay.reviews.length
  }

  let averageRating = calculateAverageRating()

  if (!stay || !order) return <div className='loader'></div>
  return (
    <section className='stay-details'>
      <MainHeader />
      <div className='stay-name'>
        {isEdit && (
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => handleChange(e.target)}
              value={stay.name}
              type='text'
              name='name'
              id='name'
            />
          </form>
        )}
        {!isEdit && (
          <>
            <h1
              onMouseLeave={() => {
                setIsOver(false)
              }}
              onMouseOver={() => {
                setIsOver(true)
              }}
            >
              {stay.name}
              {isOver && (
                <button className='edit-btn' onClick={() => setIsEdit(true)}>
                  🖉
                </button>
              )}
            </h1>
          </>
        )}
        <div className='stay-name-actions'>
          <div className='action'>
            <ShareModal
              stayImg={stay.imgUrls[0]}
              stay={stay}
              averageRating={averageRating}
            />
          </div>

          {/* <div className='action'> 
          <img src={heart} alt="" />
          <p className='text'>save</p>
          </div> */}
        </div>
      </div>

      <div className='imgs-container'>
        <div className='big-img'>
          <img src={stay.imgUrls[0]} alt='stay img' />
        </div>
        <div className='smallImg small-img1'>
          <img src={stay.imgUrls[1]} alt='stay img' />
        </div>
        <div className='smallImg small-img2'>
          <img src={stay.imgUrls[2]} alt='stay img' />
        </div>
        <div className='smallImg small-img3'>
          <img src={stay.imgUrls[3]} alt='stay img' />
        </div>
        <div className='smallImg small-img4'>
          <img src={stay.imgUrls[4]} alt='stay img' />
        </div>
      </div>
      <section className='mid-section'>
        <div className='reservation'>
          <ReservationModal
            stayId={stay._id}
            price={stay.price}
            order={order}
            editOrder={editOrder}
          />
        </div>
        <section className='stay-information'>
          <h1>
            {stay.type === 'House' ? 'Entire ' + stay.type : stay.type} in{' '}
            {stay.loc.city}, {stay.loc.country}
          </h1>
          <p className='stay-contents'>
            {stay.capacity} guest
            {stay.capacity !== 1 && <span>s</span>} • {stay.bedrooms} bedroom
            {stay.bedrooms !== 1 && <span>s</span>} •{' '}
            {stay.bedrooms !== 0 ? stay.beds : 1} bed
            {stay.bedrooms > 1 && stay.beds > 1 && <span>s</span>} •{' '}
            {stay.bathrooms} bathroom{stay.bathrooms !== 1 && <span>s</span>}
          </p>
          <p className='stay-rating'>
            🟊 {averageRating.toFixed(1)} •{' '}
            <span>{stay.reviews.length} reviews</span>
          </p>
        </section>
        <section className='hostedBy'>
          {/* <img src={stay.host.imgUrl} alt='' /> */}
          <div className='hostedBy-img'>
            {/* <img src={img} alt='' /> */}
            <Avatar alt='Remy Sharp' src={stay.host.pictureUrl} />
          </div>
          <div className='hostedBy-name'>
            <h2>{stay.host.fullname}</h2>
            <p>{stay.hostingYears} years hosting</p>
          </div>
        </section>
        <section className='guest-experiences'>
          <div className='box box1'>
            <div className='svg-container'>
              <img src={key} alt='' />
            </div>
            <div className='box-text'>
              <h2>Great check-in experience</h2>
              <p>
                95% of recent guests gave the check-in process a 5-star rating
              </p>
            </div>
          </div>

          <div className='box box2'>
            <div className='svg-container'>
              <img src={chat} alt='' />
            </div>
            <div className='box-text'>
              <h2>Great communication</h2>
              <p>
                100% of recent guests rated Cristina 5-star in communication.
              </p>
            </div>
          </div>

          <div className='box box3'>
            <div className='svg-container'>
              <img src={locationImg} alt='' />
            </div>
            <div className='box-text'>
              <h2>Great location</h2>
              <p>100% of recent guests gave the location a 5-star rating.</p>
            </div>
          </div>
        </section>
        {/* HARD CODDED */}
        <section className='stay-descripiton'>{stay.summary}</section>
        <section className='stay-amenities'>
          <h4>What this place offers</h4>
          <div className='amenities-container'>
            {AMENTITIES.map((amentitie, index) => (
              <div className="icons-wrap" key={index}>
                <span className={`label-icon`}>
                  {labelsSvg[amentitie.svg] ? React.createElement(labelsSvg[amentitie.svg]) : ''}
                </span>
                <span className="label-title">
                  {amentitie.title}
                </span>
              </div>
            ))}
          </div>

        </section>
      </section>
      {/* <section className='stay-reviews'>
        <h2>
          🟊 {averageRating.toFixed(1)} • {stay.reviews.length} review
          {stay.reviews.length !== 1 && <span>s</span>}
        </h2>
        <div className='reviews'>
          {stay.reviews.map((review, index) => {
            return (
              <div className='review' key={index}>
                <div className='review-by'>
                  <Avatar
                    className='avatar'
                    alt='Remy Sharp'
                    src={avatarUrl}
                  />
                  <h3 className='name'>{review.by.fullname}</h3>
                  <p className='review-date'>
                    {new Date(review.at).toLocaleString('en', {
                      month: 'short'
                    })}{' '}
                    {''}
                    {new Date(review.at).getFullYear()}
                  </p>
                </div>
                <p className='text'>{review.txt}</p>
              </div>
            )
          })}
        </div>
      </section> */}

      <section className='stay-reviews'>
        <h2>
          🟊 {averageRating.toFixed(1)} • {stay.reviews.length} review
          {stay.reviews.length !== 1 && <span>s</span>}
        </h2>
        <div className='reviews'>
          {stay.reviews.slice(0, reviewsToShow).map((review, index) => {
            return (
              <div className='review' key={index}>
                <div className='review-by'>
                  <Avatar
                    className='avatar'
                    alt='Remy Sharp'
                    src={review.by.imgUrl}
                  />
                  <h3 className='name'>{review.by.fullname}</h3>
                  <p className='review-date'>
                    {new Date(review.at).toLocaleString('en', {
                      month: 'short'
                    })}{' '}
                    {''}
                    {new Date(review.at).getFullYear()}
                  </p>
                </div>
                <p className='text'>{review.txt}</p>
              </div>
            );
          })}
          {stay.reviews.length > reviewsToShow && (
            <button className='showMore-btn' onClick={() => setReviewsToShow(reviewsToShow + 5)}>
              Show More Reviews
            </button>
          )}
        </div>
      </section>

      <section className='map'>
        <h2>Where you'll be</h2>
        <GoogleMap stayLoc={stay.loc} />
      </section>
    </section>
  )
}
