import { useNavigate } from 'react-router'
import { MainHeader } from '../../cmps/MainHeader'
import * as labelsSvg from '../../services/ementities.icon.jsx'
import * as React from 'react'
import { AMENTITIES } from '../../data/amentities.js'
import { useState } from 'react'


export function Page7({ stay}) {
  const navigate = useNavigate()
  const [label, setLabel] = useState([])
  const [amentitiesToEdit, setAmentitiesToEdit] = useState(stay.labels)


  return (
    <section className='step2'>
      <MainHeader />

      <div className='container'>

        <h1>Tell guests what your place has to offer</h1>
        <p>You can add more amenities after you publish your listing.</p>


        <div className='checkbox-list'>
          {AMENTITIES.map((amentitie, index) => (
            <div className='checkbox-item' key={index}>
              {/* <input
              onChange={handleLablesChange}
              type='checkbox'
              name={label.title}
              className='labels'
            /> */}
              <span className='checkbox-title'>{amentitie.title}</span >
              {labelsSvg[amentitie.svg] ? React.createElement(labelsSvg[amentitie.svg]) : ''}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
