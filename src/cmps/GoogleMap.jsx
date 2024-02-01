import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import homeIcon from '../assets/img/svgs/homeIcon.svg'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export function GoogleMap({ stayLoc }) {
  const CustomMarker = ({ homeIcon }) => (
    <div className='home-marker'>
      <svg
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        role='presentation'
        focusable='false'
        style={{
          display: 'block',
          height: '22px',
          width: '22px',
          fill: '#fff'
        }}
      >
        <path d='m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z' />
      </svg>
      <img
        src={homeIcon}
        alt='Home Icon'
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  )

  const { lat, lan } = stayLoc
  const [center, setCenter] = useState({ lat: lan, lng: lat })
  const zoom = 11

  function handleClick({ lat, lan }) {
    setCenter({ lat, lan })
  }

  return (
    // Need to set the container height explicitly
    <div className='map-container' style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAmOFk9Q3eWWCf4xjyjNn2E_EMdJIAx9_8' }}
        center={center}
        defaultZoom={zoom}
        onClick={handleClick}
      >
        <CustomMarker lat={center.lat} lng={center.lng} homeIcon={homeIcon} />
      </GoogleMapReact>
    </div>
  )
}
