import { useEffect, useState } from 'react'
import { DateSelect } from './search/DateSelect'
import { useSelector } from 'react-redux'
import { orderService } from '../services/order.service'
import { useNavigate } from 'react-router'
import { stayService } from '../services/stay.service.local'

export function ReservationModal({ stayId, price, order, setOreder }) {
  const [modalOpen, setModalOpen] = useState(null)
  const navigate = useNavigate()
  console.log('from modal:', order);

  function handleDateSelectChange(field, value) {
    if (field === 'checkIn') var checkOut = ''

    const formattedDate = value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    setOrderToEdit((prevOrder) => ({
      ...prevOrder,
      [field]: formattedDate
    }))

    if (field === 'checkOut') {
      const totalNights = stayService.daysBetweenDates(order.checkIn, value)
      const totalPrice = totalNights * price

      setOreder((prevOrder) => ({ ...prevOrder, totalNights, totalPrice }))

    }

    if (field === 'checkOut') setModalOpen(false)
  }



  return (
    <section className='reservation-modal'>
      <div className='reservation-header'>
        <div className='price'>
          <p>
            <span>${price}</span>  a night{' '}
          </p>
        </div>
      </div>
      <div className='reservation-data'>
        <div className='reservation-date'>
          <div className='check-in' onClick={() => setModalOpen(true)}>
            <button>
              <span>Check-in</span>
              <input type='text' value={orderToEdit.checkIn} readOnly />
            </button>
          </div>
          <div className='check-out' onClick={() => setModalOpen(true)}>
            <button>
              <span>Check out</span>
              <input type='text' value={orderToEdit.checkOut} readOnly />
            </button>
          </div>
        </div>
        {modalOpen && (
          <DateSelect
            onSetField={(field, value) => handleDateSelectChange(field, value)}
            checkIn={orderToEdit.checkIn}
            checkOut={orderToEdit.checkOut}
          />
        )}
        {
          <div className='guest'>
            {order.totalGuests} guest{order.totalGuests !== 1 && <span>s</span>}
            {order.guests.infants !== 0 && <> , {order.guests.infants} infant{order.guests.infants !== 1 && <span>s</span>}</>}

          </div>
        }
      </div>
      <div className='reserve-button'>
        <button className="reserve" onClick={() => navigate(`/book/${stayId}`)}>Reserve</button>
        <span className='no-charge'>you won't be charged yet</span>
      </div>

      {order.checkIn && order.checkOut && <div className='total-price'>
        <div className='price-calc'>{order.totalNights} night{order.totalNights > 1 && <span>s</span>} x ${price}</div>
        <div className='total-price'>${order.totalPrice}</div>
      </div>}

    </section >
  )
}
