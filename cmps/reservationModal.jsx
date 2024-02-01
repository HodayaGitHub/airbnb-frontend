import { useState } from "react";
import { DateSelect } from "./filtring/DateSelect";
import { useSelector } from "react-redux";



export function ReservationModal() {
  const [modalOpen, setModalOpen] = useState(null)
  const [order, setOreder] = useState({
    checkIn: useSelector(storeState => storeState.stayModule.filterBy.checkIn) || '',
    checkOut: useSelector(storeState => storeState.stayModule.filterBy.checkOut) || '',
    guests: useSelector(storeState => storeState.stayModule.filterBy.guests) || {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0
    }
  })

  let count = order.guests.adults + order.guests.children + order.guests.infants + order.guests.pets
  function handleDateSelectChange(field, value) {
    if (field === 'checkIn') order.checkOut = ''
    setOreder((prevOrder) => ({ ...prevOrder, [field]: value.toDateString() }))
    if (field === 'checkOut') setModalOpen(false)
  }

  return (
    <section className='reservation-modal'>
      <div className='reservation-header'>
        <div className='check-in' onClick={() => setModalOpen(true)}>
          <p>Check in</p>
          <input
            type='text'
            value={order.checkIn}
            readOnly
          />
        </div>

        <div className='check-out' onClick={() => setModalOpen(true)}>
          <p>Check out</p>
          <input
            type='text'
            value={order.checkOut}
            readOnly
          />
        </div>
        {modalOpen && <DateSelect
          onSetField={(field, value) => handleDateSelectChange(field, value)}
          checkIn={order.checkIn}
          checkOut={order.checkOut}
        />}
        {<span>{count} guest{count !== 1 && <span>s</span>}</span>}
        <div className='price'>
          <p>
            <span>$485</span> night{' '}
          </p>
        </div>
        <div className='review'>
          <p>★ 4.95 • 8 reviews</p>
        </div>
      </div>
      <div className='reservation-data'></div>
      <div className='reserve-button'>
        {/* {modalOpen === DATE_MODAL && (
          <DateSelect
            onSetField={(field, value) => handleDateSelectChange(field, value)}
            checkIn={filterByToEdit.checkIn}
            checkOut={filterByToEdit.checkOut}
          />
        )} */}
        <button>Reserve</button>
      </div>
    </section>
  )
}
