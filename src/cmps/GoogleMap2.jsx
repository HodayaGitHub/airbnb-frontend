import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => (
  <div style={{ fontSize: '44px', fontWeight: 'bold', color: 'red' }}>
    {text}
  </div>
);

export function GoogleMap2() {
  const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })
  const zoom = 13

  function handleClick({ lat, lng }) {
    setCenter({ lat, lng })
  }

  return (
    // Need to set the container height explicitly
    <div style={{ height: '60vh', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        center={center}
        defaultZoom={zoom}
        onClick={handleClick}
      >
        <AnyReactComponent {...center} text='🏡' />
      </GoogleMapReact>
    </div>
  )
}
