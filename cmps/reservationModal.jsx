import { useEffect, useState } from 'react'
import { DateSelect } from './search/DateSelect'
import { useSelector } from 'react-redux'
import { orderService } from '../services/order.service'
import { useNavigate } from 'react-router'

export function ReservationModal({ stayId }) {
  const [modalOpen, setModalOpen] = useState(null)
  const [order, setOreder] = useState(orderService.getEmptyOrder())
  const navigate = useNavigate()
  let count = order.guests.adults.count + order.guests.children.count + order.guests.infants.count + order.guests.pets.count
  var checkIn = useSelector((storeState) => storeState.stayModule.filterBy.checkIn)
  var checkOut = useSelector((storeState) => storeState.stayModule.filterBy.checkOut)
  var guests = useSelector((storeState) => storeState.stayModule.filterBy.guests)
  order.stayId = stayId
  useEffect(() => {
    setOreder((prevOrder) => ({ ...prevOrder, checkOut, checkIn, guests }))
    if (!count) order.guests.adults = 1
  }, [])

  function handleDateSelectChange(field, value) {
    if (field === 'checkIn') var checkOut = ''
    const formattedDate = value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    setOreder((prevOrder) => ({
      ...prevOrder,
      checkOut,
      [field]: formattedDate
    }))
    if (field === 'checkOut') setModalOpen(false)
  }

  return (
    <section className='reservation-modal'>
      <div className='reservation-header'>
        <div className='price'>
          <p>
            <span>$1485</span> night{' '}
          </p>
        </div>
      </div>
      <div className='reservation-data'>
        <div className='reservation-date'>
          <div className='check-in' onClick={() => setModalOpen(true)}>
            <button>
              <span>Check-in</span>
              <input type='text' value={order.checkIn} readOnly />
            </button>
          </div>
          <div className='check-out' onClick={() => setModalOpen(true)}>
            <button>
              <span>Check out</span>
              <input type='text' value={order.checkOut} readOnly />
            </button>
          </div>
        </div>
        {modalOpen && (
          <DateSelect
            onSetField={(field, value) => handleDateSelectChange(field, value)}
            checkIn={order.checkIn}
            checkOut={order.checkOut}
          />
        )}
        {
          <div className='guest'>
            {count} guest{count !== 1 && <span>s</span>}
          </div>
        }
      </div>
      <div className='reserve-button'>
        <button onClick={() => navigate(`/book/${stayId}`)}>Reserve</button>
      </div>
    </section >
  )
}
