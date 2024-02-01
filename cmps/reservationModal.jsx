import { useEffect, useState } from 'react'
import { DateSelect } from './search/DateSelect'
import { useNavigate } from 'react-router'
import { stayService } from '../services/stay.service'

export function ReservationModal({ stayId, price, order, editOrder }) {

  const [modalOpen, setModalOpen] = useState(null)
  const [orderToEdit, setOrderToEdit] = useState(order)
  const navigate = useNavigate()


  useEffect(() => {
    editOrder({ ...orderToEdit })
  }, [orderToEdit])
  function handleDateSelectChange(field, value) {
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
      setOrderToEdit((prevOrder) => ({ ...prevOrder, totalNights, totalPrice }))
      setModalOpen(false)
    }
    // editOrder(orderToEdit)
  }

  function savePreOrderToLocalStorage(order) {
    localStorage.setItem('PRE_ORDER', JSON.stringify(order))
  }

  return (
    <section className='reservation-modal'>
      <div className='reservation-header'>
        <div className='price'>
          <p>
            <span>${price}</span>  a night
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
            {orderToEdit.totalGuests} guest{orderToEdit.totalGuests !== 1 && <span>s</span>}
            {orderToEdit.guests.infants !== 0 && <> , {orderToEdit.guests.infants} infant{orderToEdit.guests.infants !== 1 && <span>s</span>}</>}

          </div>
        }
      </div>
      <div className='reserve-button'>
        <button className="reserve" onClick={() => {
          savePreOrderToLocalStorage(orderToEdit)
          navigate(`/book/${stayId}`)
        }}>
          Reserve</button>

        <span className='no-charge'>you won't be charged yet</span>
      </div>

      <div className='total-price'>
        <div className='price-calc'>{orderToEdit.totalNights} night{order.totalNights > 1 && <span>s</span>} x ${price}</div>
        <div className='total-price'>${orderToEdit.totalPrice}</div>
      </div>

    </section >
  )
}
