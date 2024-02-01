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
import location from '../assets/img/svgs/location.svg'
import { ReservationModal } from '../cmps/reservationModal.jsx'
import { GoogleMap } from '../cmps/GoogleMap.jsx'
import { FavoriteIcon } from '../cmps/favoriteIcon.jsx'
import ShareModal from '../cmps/shareModal.jsx'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { orderService } from '../services/order.service.js'

export function StayDetails() {
  // const [msg, setMsg] = useState(getEmptyMsg())
  const [stay, setStay] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const { stayId } = useParams()
  const navigate = useNavigate()
  const [order, setOreder] = useState(orderService.getEmptyOrder())
  const location = useLocation()

  useEffect(() => {
    loadStay()
    createOrder()
  }, [stayId])

  function createOrder() {
    const searchParams = new URLSearchParams(location.search)
    const check_In = decodeURIComponent(searchParams.get('checkIn'))
    const check_Out = decodeURIComponent(searchParams.get('checkOut'))
    const guestParam = decodeURIComponent(searchParams.get('guestParam'))
    var guests = queryString.parse(guestParam)
    guests.adults = +guests.adults
    guests.children = +guests.children
    guests.infants = +guests.infants
    guests.pets = +guests.pets
    if (!guests.adults) guests.adults = 1
    const checkIn = new Date(check_In).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    const checkOut = new Date(check_Out).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    let count = guests.adults + guests.children
    const nights = stayService.daysBetweenDates(checkIn, checkOut)
    setOreder((prevOrder) => ({ ...prevOrder, checkIn, checkOut, totalNights: nights, guests, stayId, totalGuests: count }))
    console.log('from details: ', order);
  }

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      // showErrorMsg('Cant load stay')
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

    const totalRating = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    return totalRating / stay.reviews.length
  }

  let averageRating = calculateAverageRating()

  if (!stay) return <div></div>
  return (
    <section className='stay-details'>
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
            <ShareModal stayImg={stay.imgUrls[0]} stay={stay} averageRating={averageRating} />
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
          <ReservationModal stayId={stay._id} price={stay.price} order={order} setOreder={setOreder} />
        </div>
        <section className='stay-information'>
          <h1>
            {stay.type === 'House' ? 'Entire ' + stay.type : stay.type} in{' '}
            {stay.loc.city}, {stay.loc.country}
          </h1>
          {/* HARD CODED FOR NOW */}
          <p className='stay-contents'>
            {stay.capacity} guest
            {stay.capacity !== 1 && <span>s</span>} • {stay.bedrooms} bedroom
            {stay.bedrooms !== 1 && <span>s</span>} •
            3 beds • {stay.bathrooms} bathroom{stay.bathrooms !== 1 && <span>s</span>}
          </p>
          <p className='stay-rating'>
            🟊 {averageRating.toFixed(2)} • <span>{stay.reviews.length} reviews</span>
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
            <p>{stay.host.yearsOfHosting} years hosting</p>
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
              <img src={location} alt='' />
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
            {stay.amenities.map((amenity, index) => (
              <p key={index}>{amenity}</p>
            ))}
          </div>
        </section>
      </section>
      <section className='stay-reviews'>
        <h2>
          🟊 {averageRating.toFixed(2)} • {stay.reviews.length} review
          {stay.reviews.length !== 1 && <span>s</span>}
        </h2>
        <div className='reviews'>
          {stay.reviews.map((review, index) => {
            return (
              <div className='review' key={index}>
                <div className='review-by'>
                  <Avatar className='avatar' alt='Remy Sharp' src={review.imgUrl} />
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
      </section>
      {/* <section className='map'>
        <h2>Where you'll be</h2>
        <GoogleMap stayLoc={stay.loc}/>
      </section> */}
    </section>
  )
}
