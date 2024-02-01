import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';
import { MainHeader } from '../../cmps/MainHeader'
import { Omg } from '../../services/labels.icons.new.stay'
import room from '../../assets/img/svgs/room.svg'
import House from '../../assets/img/svgs/house.svg'

export function Page3() {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState(null);


  const handleItemClick = (itemName) => {
    setSelectedItem(itemName === selectedItem ? null : itemName);
  };

  return (
    <>

      <MainHeader />
      <section className='step3 steps-layout'>
        <div className='step3-container container'>
          <h1>What type of place will guests have?</h1>
          <div
            className={`place-type-item ${selectedItem === 'entirePlace' ? 'selected' : ''}`}
            onClick={() => handleItemClick('entirePlace')}
          >
            <span className='place-title'>An entire place
              <p>Guest have the whole place to themselves</p>
            </span>
            <img src={House} alt="room icon" />

          </div>

          <div
            className={`place-type-item ${selectedItem === 'room' ? 'selected' : ''}`}
            onClick={() => handleItemClick('room')}
          >            <span className='place-title'>
              A room
              <p >  Guests have their own room in a home, plus access to shared spaces.</p>
            </span>
            <img src={room} alt="room icon" />

          </div>

          <div
            className={`place-type-item ${selectedItem === 'sharedRoom' ? 'selected' : ''}`}
            onClick={() => handleItemClick('sharedRoom')}
          >            <span className='place-title'> A shared room
              <p>
                Guests sleep in a room or common area that may be shared with you or
                others.
              </p>
            </span>

            <Omg />
          </div>

        </div >
      </section>
    </>

  )
}
