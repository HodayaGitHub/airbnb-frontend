import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
// import { stayService } from '../services/stay.service.js'
import { stayService } from '../services/stay.service.local.js'
import { updateStay } from '../store/actions/stay.actions.js'
// HARD CODED
import img from '../assets/img/host-img/stay-host-img.jpg'
import reviewer1 from '../assets/reviewers-imgs/Emma-Johnson-img.jpg'
import key from '../assets/img/svgs/key.svg'
import chat from '../assets/img/svgs/chat.svg'
import location from '../assets/img/svgs/location.svg'
import { ReservationModal } from '../cmps/reservationModal.jsx'

export function StayDetails() {
  // const [msg, setMsg] = useState(getEmptyMsg())
  const [stay, setStay] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const { stayId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadStay()
  }, [stayId])

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
          <div className='action'>Share</div>
          <div className='action'>Save</div>
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
          <ReservationModal stayId={stayId} />
        </div>
        <section className='stay-information'>
          <h1>
            {stay.type === 'House' ? 'Entire ' + stay.type : stay.type} in{' '}
            {stay.loc.city}, {stay.loc.country}
          </h1>
          {/* HARD CODED FOR NOW */}
          <p className='stay-contents'>
            5 guests • 3 bedrooms • 3 beds • 2 baths
          </p>
          <p className='stay-rating'>
            ★4.95 • <span>152 reviews</span>
          </p>
        </section>
        <section className='hostedBy'>
          {/* <img src={stay.host.imgUrl} alt='' /> */}
          <div className='hostedBy-img'>
            {/* <img src={img} alt='' /> */}
            <Avatar alt='Remy Sharp' src={img} />
          </div>
          <div className='hostedBy-name'>
            <h2>{stay.host.fullname}</h2>
            <p>5 years hosting</p>
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
        <section className='stay-descripiton'>
          The comfortable apartment at the heart of busy Tsim Sha Tsui.2minutes
          walk to the MTR/Subway station.There are many biggest shopping mall
          around here:K-11,The One,Harbour city ect.
        </section>
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
          ★ 4.95 • {stay.reviews.length} review
          {stay.reviews.length !== 1 && <span>s</span>}
        </h2>
        <div className='reviews'>
          {stay.reviews.map((review, index) => {
            return (
              <div className='review' key={index}>
                <div className='review-by'>
                  <Avatar className='avatar' alt='Remy Sharp' src={reviewer1} />
                  <h3 className='name'>{review.by.fullname}</h3>
                  <p className='review-date'>
                    {new Date(review.postAt).toLocaleString('en', {
                      month: 'short'
                    })}{' '}
                    {''}
                    {new Date(review.postAt).getFullYear()}
                  </p>
                </div>
                <p className='text'>{review.txt}</p>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}
