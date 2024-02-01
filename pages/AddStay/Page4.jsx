import { GoogleMap2 } from '../../cmps/GoogleMap2'
import { MainHeader } from '../../cmps/MainHeader'
import { useNavigate } from 'react-router'

export function Page4() {
  const navigate = useNavigate()
  return (
    <section className='step4'>
      <MainHeader />
      <div className='step4-container'>
        <div className="place-located">
          <h1>Where's your place located?</h1>
          <p>
            Your address is only shared with guests after they’ve made a
            reservation.
          </p>
          <section className='map'>
            {/* <h2>Where you'll be</h2> */}
            <GoogleMap2 />
          </section>

        </div>
      </div>



    </section>
  )
}
