import * as React from 'react';
import * as labelsSvg from '../services/labels.icons.service.jsx';

import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { stayService } from '../services/stay.service.js';
import { updateStay } from '../store/actions/stay.actions.js';
import { ReservationModal } from '../cmps/reservationModal.jsx';
import { GoogleMap } from '../cmps/GoogleMap.jsx';
import { addOrder, updateOrder } from '../store/actions/order.actions.js';
import { useSelector } from 'react-redux';
import { MainHeader } from '../cmps/MainHeader.jsx';
import { AMENTITIES } from '../data/stay.details.amentities.js';
import { orderService } from '../services/order.service.js';

import ShareModal from '../cmps/shareModal.jsx';
import queryString from 'query-string';
import Avatar from '@mui/material/Avatar';
import key from '../assets/img/svgs/key.svg';
import chat from '../assets/img/svgs/chat.svg';
import locationImg from '../assets/img/svgs/location.svg';

export function StayDetails() {
  // const [msg, setMsg] = useState(getEmptyMsg())
  const [stay, setStay] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [avatarUrls, setAvatarUrls] = useState([]);
  const [hostAvatarUrl, setHostAvatarUrl] = useState('');
  const [reviewsToShow, setReviewsToShow] = useState(6);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const { stayId } = useParams();
  const navigate = useNavigate();
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);
  var order = useSelector((storeState) => storeState.orderModule.order) || JSON.parse(localStorage.getItem('PRE_ORDER'));
  const location = useLocation();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    loadStay();
  }, [stayId]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        if (!stay || !stay.reviews) {
          return;
        }

        const urls = await Promise.all(
          stay.reviews.map(async () => {
            return await stayService.fetchAvatar();
          })
        );
        setAvatarUrls(urls);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      };
    };

    const fetchHostAvatar = async () => {
      try {
        if (!stay || !stay.host) {
          return;
        };

        const url = await stayService.fetchAvatar();
        setHostAvatarUrl(url);
      } catch (error) {
        console.error('Error fetching host avatar:', error);

      };
    };

    fetchAvatars();
    fetchHostAvatar();
  }, [stay]);

  function editOrder(order) {
    updateOrder(order)
  }

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
      if (!order) {
        orderService.createOrder(stay, location, loggedInUser);
        console.log()
      }
    } catch (err) {
      // navigate('/stay')
      console.log('Error while trying to load the stay')
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


  if (!stay || !order) return <div className='loader'></div>
  return (
    <>
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
                setIsHover(false)
              }}
              onMouseOver={() => {
                setIsHover(true)
              }}
            >
              {stay.name}
              {isHover && (
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
              averageRating={calculateAverageRating()}
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
        {stay.imgUrls.slice(1).map((url, index) => (
          <div
            key={`small-img-${index + 1}`}
            className={`smallImg small-img${index + 1}`}>
            <img src={url} alt={`stay img ${index + 1}`} />
          </div>
        ))}
      </div>

      {isMobile ? (

        <ReservationModal
          stay={stay}
          stayId={stayId}
          price={stay.price}
          order={order}
          editOrder={editOrder}
          isMobile={isMobile}
          loggedInUser={loggedInUser}
        />
      ) : (
        <section className='mid-section'>
          <ReservationModal
            stay={stay}
            stayId={stayId}
            price={stay.price}
            order={order}
            editOrder={editOrder}
            isMobile={isMobile}
            loggedInUser={loggedInUser}
          />

          <section className='stay-information'>
            <h1>
              {stay.type === 'House' ? 'Entire ' + stay.type : stay.type} in{' '}
              {stay.loc.city}, {stay.loc.country}
            </h1>
            <p className='stay-contents'>
              {stay.capacity} guest
              {stay.capacity !== 1 && <span>s</span>} • {stay.bedrooms} bedroom
              {stay.bedrooms !== 1 && <span>s</span>} • {' '}
              {stay.bedrooms !== 0 ? stay.beds : 1} bed
              {stay.bedrooms > 1 && stay.beds > 1 && <span>s</span>} •{' '}
              {stay.bathrooms} bathroom{stay.bathrooms !== 1 && <span>s</span>}
            </p>
            <p className='stay-rating'>
              🟊 {calculateAverageRating().toFixed(1)} •{' '}
              <span>{stay.reviews.length} reviews</span>
            </p>
          </section>

          <section className='hostedBy'>
            <div className='hostedBy-img'>
              <Avatar alt='Remy Sharp' src={hostAvatarUrl || stay.host.pictureUrl} />
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
      )}


      <section className='stay-reviews'>
        <h2>
          🟊 {calculateAverageRating().toFixed(1)} • {stay.reviews.length} review
          {stay.reviews.length !== 1 && <span>s</span>}
        </h2>

        <div className='reviews'>
          {stay.reviews.slice(0, reviewsToShow).map((review, index) => {

            return (
              <div className='review' key={index}>
                <div className='review-by'>
                  <Avatar
                    className='avatar'
                    alt={review.by.fullname}
                    src={avatarUrls[index]}
                  />


                  <h3 className='name'>{review.by.fullname}</h3>
                  <p className='review-date'>
                    {new Date(review.at).toLocaleString('en', { month: 'short' })}{' '}{''}
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
    </>

  );
};
