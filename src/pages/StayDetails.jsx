import * as React from 'react';
import ShareModal from '../cmps/shareModal.jsx';

import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { stayService } from '../services/stay.service.js';
import { updateStay } from '../store/actions/stay.actions.js';
import { ReservationModal } from '../cmps/ReservationModal.jsx';
import { GoogleMap } from '../cmps/GoogleMap.jsx';
import { addOrder, updateOrder } from '../store/actions/order.actions.js';
import { useSelector } from 'react-redux';
import { orderService } from '../services/order.service.js';
import { StayDescription } from '../cmps/stayDetails/StayDescription.jsx';
import { StayReviews } from '../cmps/stayDetails/StayReviews.jsx';
import { MainHeader } from '../cmps/MainHeader.jsx';


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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function editOrder(order) {
    updateOrder(order)
  }

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
      if (!order) {
        orderService.createOrder(stay, location, loggedInUser);
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
              averageRating={stayService.calculateAverageRating(stay)}
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

      {!isMobile ? (
        <section className='mid-section' >
          <ReservationModal
            stay={stay}
            stayId={stayId}
            price={stay.price}
            order={order}
            editOrder={editOrder}
            loggedInUser={loggedInUser}
            isMobile={isMobile}
          />
          <StayDescription stay={stay} hostAvatarUrl={hostAvatarUrl} />
        </section>
      ) : (
        <>
          <ReservationModal
            stay={stay}
            stayId={stayId}
            price={stay.price}
            order={order}
            editOrder={editOrder}
            loggedInUser={loggedInUser}
            isMobile={isMobile}
          />
          <section className='mid-section' >
            <StayDescription hostAvatarUrl={hostAvatarUrl} stay={stay} />
          </section>
        </>
      )}

      <StayReviews
        stay={stay}
        avatarUrls={avatarUrls} />

      <section className='map'>
        <h2>Where you'll be</h2>
        <GoogleMap stayLoc={stay.loc} />
      </section>
    </>

  );
};
