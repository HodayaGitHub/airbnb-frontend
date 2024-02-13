import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DateSelect } from './search/DateSelect';
import { useNavigate } from 'react-router';
import { stayService } from '../services/stay.service';
import { orderService } from '../services/order.service';
import { ButtonHover } from './buttonHover';
import { LoginSignupModal } from './LoginSignupModal';
import { useLocation } from 'react-router-dom';

export function ReservationModal({ stayId, stay, price, order, editOrder, isMobile }) {

  const [modalOpen, setModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(order);
  const [isLoginOpen, setisLoginOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);

  useEffect(() => {
    console.log('orderToEdit', orderToEdit)
    editOrder({ ...orderToEdit })
  }, [orderToEdit])



  function handleDateSelectChange(field, value) {
    const valueToUnix = Math.floor(value.getTime() / 1000)
    setOrderToEdit((prevOrder) => ({ ...prevOrder, [field]: valueToUnix }))

    if (field === 'checkOut' && valueToUnix) {
      const totalNights = stayService.calcNights(value.checkIn, value.checkOut)
      const totalPrice = totalNights * price;
      setOrderToEdit((prevOrder) => ({ ...prevOrder, totalNights, totalPrice }))
      setModalOpen(false)
    }
  }

  function savePreOrderToLocalStorage(order) {
    localStorage.setItem('PRE_ORDER', JSON.stringify(order));
  };

  function handleReserveClick() {
    if (!loggedInUser) {
      setIsLoginModalOpen(!isLoginModalOpen);
    } else {
      savePreOrderToLocalStorage(orderToEdit);
      navigate(`/book/${stayId}`);
    }
  }

  return (

    <section className='reservation'>
      <div className='reservation-modal'>
        <div className='reservation-header'>
          <div className='price'>
            <span>
              <strong style={{ fontSize: '1.7rem' }}>${price}</strong>
              <span style={{ fontSize: '1.2rem' }}> night</span>
            </span>
          </div>
        </div>

        {isMobile ? (
          <>
            <div className='reserve-button' onClick={handleReserveClick}>
              <ButtonHover buttonContent="Reserve" />
              {isLoginModalOpen && (
                <LoginSignupModal loginOrSignup='signup' state={isLoginModalOpen} />
              )}
            </div>

          </>
        ) : (
          <>
            <div className='reservation-data'>
              <div className='reservation-date'>
                <div className='check-in' onClick={() => setModalOpen(true)}>
                  <button>
                    <span>Check in</span>
                    <input
                      type='text'
                      value={stayService.formatDateFromUnix(order.checkIn) || stayService.formatDateFromUnix(orderToEdit.checkIn)}
                      readOnly
                    />
                  </button>
                </div >

                <div className='check-out' onClick={() => setModalOpen(true)}>
                  <button>
                    <span>Check out</span>
                    <input type='text'
                      value={stayService.formatDateFromUnix(order.checkOut) || stayService.formatDateFromUnix(orderToEdit.checkOut)}
                      readOnly
                    />
                  </button>
                </div>
              </div >

              {modalOpen && (
                <DateSelect
                  onSetField={(field, value) => handleDateSelectChange(field, value)}
                  checkIn={orderToEdit.checkIn}
                  checkOut={orderToEdit.checkOut}
                />)
              }
              {
                <div className='guest'>
                  {orderToEdit.totalGuests} Guest{orderToEdit.totalGuests !== 1 && <span>s</span>}
                  {orderToEdit.guests.infants !== 0 && <> , {orderToEdit.guests.infants} infant{orderToEdit.guests.infants !== 1 && <span>s</span>}</>}
                </div>
              }
            </div >

            <div className='reserve-button' onClick={handleReserveClick}>
              <ButtonHover buttonContent="Reserve" />
              {isLoginModalOpen && (
                <LoginSignupModal loginOrSignup='signup' state={isLoginModalOpen} />
              )}
            </div>
            <span className='no-charge'>You won't be charged yet</span>



            <div className='total-price-container'>
              <div className='price-calc'>
                {orderToEdit.totalNights} Night{orderToEdit.totalNights !== 1 && 's'} x ${price}
              </div>
              <div className='total-price'>Total ${orderToEdit.totalNights * price}</div>
            </div>
          </>
        )}


      </div>

    </section >

  )
}
