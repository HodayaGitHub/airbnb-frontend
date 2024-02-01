import { useNavigate } from 'react-router'
import { MainHeader } from '../../cmps/MainHeader'

export function Page1() {
  const navigate = useNavigate()

  return (
    <section className='step1 steps-layout'>
      <MainHeader />


      <div className='content-container'>
        <div>
          <h4>Step 1</h4>
          <h1>Tell us about your place</h1>
          <p>
            In this step, we'll ask you which type of property you have and if
            guests will book the entire place or just a room. Then let us know the
            location and how many guests can stay.
          </p>
        </div>
        <div className='video-container'>

          <video
            className='v6iu1id dir dir-ltr'
            autoPlay
            muted  // Add muted attribute
            crossOrigin='anonymous'
            playsInline
            preload='auto'
            style={{ objectFit: 'cover' }}
          >
            <source src='https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?vq=high' />
          </video>
        </div>

      </div>
    </section>
  )
}
