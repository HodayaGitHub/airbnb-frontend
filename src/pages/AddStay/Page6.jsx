
import { useNavigate } from 'react-router'
import { MainHeader } from '../../cmps/MainHeader'

export function Page6() {
  const navigate = useNavigate()

  return (
    <section className='step1 steps-layout'>
      <MainHeader />


      <div className='content-container'>
        <div>
          <h4>Step 2</h4>
          <h1>Make your place stand out</h1>
          <h1>Tell us about your place</h1>
          <p>
            In this step, you’ll add some of the amenities your place offers, plus 5
            or more photos. Then, you’ll create a title and description.
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


// import { useNavigate } from 'react-router'
// import { MainHeader } from '../../cmps/MainHeader'
// export function Page6() {
//   const navigate = useNavigate()
//   return (
//     <section className='step1'>
//       <MainHeader />
//       <h4>Step 2</h4>
//       <h1>Make your place stand out</h1>
//       <p>
//         In this step, you’ll add some of the amenities your place offers, plus 5
//         or more photos. Then, you’ll create a title and description.
//       </p>
//       <div className='video-container'>
//         <video
//           className='v6iu1id dir dir-ltr'
//           autoPlay
//           crossOrigin='anonymous'
//           playsInline
//           preload='auto'
//           style={{ objectFit: 'cover' }}
//         >
//           <source src='https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high' />
//         </video>
//       </div>
//       <button onClick={() => navigate('/become-a-host/ementities')}>
//         Next
//       </button>
//     </section>
//   )
// }

