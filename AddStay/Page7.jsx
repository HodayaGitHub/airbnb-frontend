import { useNavigate } from 'react-router'
import { MainHeader } from '../../cmps/MainHeader'
import * as labelsSvg from '../../services/ementities.icon.jsx'
import * as React from 'react'
import { AMENTITIES } from '../../data/amentities.js'
import { useState } from 'react'


export function Page7({ goToNextPage }) {
  const navigate = useNavigate()

  const [label, setLabel] = useState([])
  // const labels = stayService.getLocalLabels()

  function handleLablesChange(ev) {
    const { checked, name } = ev.target
    if (checked) {
      label.push(name)
    } else {
      const index = label.indexOf(name)
      if (index !== -1) {
        label.splice(index, 1)
      }
    }
    const labels = label
    setStay((prevStay) => ({ ...prevStay, labels }))
  }

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

      <button className="add-stay-next-page" onClick={goToNextPage}>Next</button>
    </section>
  )
}
