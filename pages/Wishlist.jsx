import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FavoriteIcon } from '../cmps/favoriteIcon'
import { SimpleSlider } from '../cmps/SimpleSlider'
import { loadUser } from '../store/actions/user.actions.js'

export function Wishlist() {
  const [isHover, setIsHover] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { userId } = useParams()

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        if (userId) {
          const user = await loadUser(userId)
          setUser(user)
          console.log(user)
        }
      } catch (error) {
        console.error('Error loading user details:', error)
      }
    }

    fetchUserDetails()
  }, [])

  return (
    <>
      {user && (
        <ul className="wishlist">
          {user.favoriteStays.map((stay) => (
            <li
              className="stay-preview"
              key={stay._id}
              onMouseOver={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div onClick={() => navigate(`/stay/${stay._id}`)}>
                <div className="img-container">
                  <FavoriteIcon stay={stay} />
                  {/* Assuming SimpleSlider component accepts stay as a prop */}
                  <SimpleSlider stay={stay} />
                </div>
                <div className="stay-desc">
                  <span className="stay-name">
                    {stay.loc?.city}, {stay.loc?.country}{' '}
                  </span>
                  <span className="stay-star">🟊</span>
                  <span className="stay-distance">2354 Kilometres away</span>
                  <span className="stay-date">Sep 29 - Oct 4</span>
                  <span className="stay-price">
                    <span className="stay-price-number">${stay.price?.toLocaleString()}</span> night
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
