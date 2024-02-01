import { Link, useNavigate, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ControlledCarousel } from './ControlledCarousel'
import { useState } from 'react'
import { FavoriteIcon } from './favoriteIcon'
import { SimpleSlider } from './SimpleSlider'


export function StayPreview({ stay, onRemoveStay }) {
  const [isHover, setIsHover] = useState(false)
  const navigate = useNavigate()
  const openStayInNewTab = () => {
    const url = `/stay/${stay._id}`
    window.open(url, '_blank')
    // navigate(`/stay/${stay._id}`)
  }
  return (
    <li
      className='stay-preview'
      key={stay._id}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div onClick={openStayInNewTab}>
      {/* <div> */}
        <div className='img-container'>
          <FavoriteIcon />
          <SimpleSlider stay={stay}/>
          {/* <ControlledCarousel stay={stay} isHover={isHover} /> */}
        </div>
        <div className='stay-desc'>
          <span className='stay-name'>
            {stay.loc?.city}, {stay.loc?.country}{' '}
          </span>
          <span className='stay-star'>🟊 4.95</span>

          {/* TODO: calc the km between the searched location to the stay location */}
          <span className='stay-distance'>x Kilometres away</span>

          {/* TODO: show the available dates */}
          <span className='stay-date'>Sep 29 - Oct 4</span>

          <span className='stay-price'>
            <span className='stay-price-number'>
              ${stay.price?.toLocaleString()}
            </span>{' '}
            night
          </span>

          {/* <div className="actions-btns-container">
                        <button onClick={() => onRemoveStay(stay._id)}> remove</button>

                    </div> */}
        </div>
      </div>
    </li>
  )
}
