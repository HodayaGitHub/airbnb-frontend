import { useNavigate } from 'react-router'
import { MainHeader } from '../../cmps/MainHeader'
import { Omg } from '../../services/labels.icons.new.stay'

export function Page3({ goToNextPage }) {
  const navigate = useNavigate()
  
  return (
    <>

      <MainHeader />
      <section className='step3 steps-layout'>
        <div className='step3-container container'>
          <h1>What type of place will guests have?</h1>

          <div className='place-type-item'>
            <span className='place-title'>An entire place
              <p>Guest have the whole place to themselves</p>
            </span>
            <Omg />

          </div>

          <div className='place-type-item'>
            <span className='place-title'>
              A room
              <p >  Guests have their own room in a home, plus access to shared spaces.</p>
            </span>
            <Omg />

          </div>

          <div className='place-type-item'>
            <span className='place-title'> A shared room
              <p>
                Guests sleep in a room or common area that may be shared with you or
                others.
              </p>
            </span>

            <Omg />
          </div>

        </div >
      </section>
      <button className="add-stay-next-page" onClick={goToNextPage}>Next</button>

    </>

  )
}
