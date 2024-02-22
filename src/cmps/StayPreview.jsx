import { Link, useNavigate, NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ControlledCarousel } from './ControlledCarousel'
import { useState } from 'react'
import { FavoriteIcon } from './FavoriteIcon.jsx'
import { SimpleSlider } from './SimpleSlider'
import { utilService } from '../services/util.service'
import star from '../assets/img/svgs/star.svg'

export function StayPreview({ stay, onRemoveStay, params }) {
  const [isHover, setIsHover] = useState(false)
  const navigate = useNavigate()
  const openStayInNewTab = () => {
    const url = `/stay/${stay._id}?${JSON.stringify(params)}`
    window.open(url, '_blank')
    // navigate(`/stay/${stay._id}`)
  }

  function calculateAverageRating(stay) {
    if (!stay || !stay.reviews || stay.reviews.length === 0) {
      return 0
    }

    const totalRating = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    return totalRating / stay.reviews.length
  }


  return (
    <li
      className='stay-preview'
      key={stay._id}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div onClick={openStayInNewTab}>
        <div className='img-container'>
          <FavoriteIcon  stay={stay} />
          <SimpleSlider stay={stay} />
        </div>
        <div className='stay-desc'>
          <span className='stay-name'>
            {stay.loc?.city || "Tel Aviv"}, {stay.loc?.country || "Israel"}{' '}
          </span>
          <span className='stay-star'>🟊 {calculateAverageRating(stay).toFixed(1)}</span>

          <span className='stay-hostname'>  Hosted by {stay.host.fullname}</span>


          <span className='stay-beds'>
            {stay.beds || 2} bed{stay.beds !== 1 ? <span>s</span> : ''}{' '}
          </span>

          <span className='stay-price'>
            {stay.price ? (
              <>
                <span className='stay-price-number'>
                  ${stay.price.toLocaleString()}
                </span>{' '}
                night
              </>
            ) : (
              '80 night'
            )}
          </span>


          {/* <div className="actions-btns-container">
                        <button onClick={() => onRemoveStay(stay._id)}> remove</button>

                    </div> */}
        </div>
      </div>
    </li>
  )
}
