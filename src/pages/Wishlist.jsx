import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FavoriteIcon } from '../cmps/FavoriteIcon.jsx'
import { SimpleSlider } from '../cmps/SimpleSlider'
import { MainHeader } from '../cmps/MainHeader.jsx'
import { userService } from '../services/user.service.js'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { stayService } from '../services/stay.service.js'

export function Wishlist() {
  const [isHover, setIsHover] = useState(false)
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);
  const [favList, setFavList] = useState([])
  const navigate = useNavigate()
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

  const params = stayService.generateQueryString(filterBy)

  useEffect(() => {
    fetchFavList()
  }, [loggedInUser])

  async function fetchFavList() {
    try {
      const wishlist = await userService.getUserWishlist(loggedInUser._id)
      setFavList(wishlist)
      console.log('wishlist', wishlist);
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      {loggedInUser && favList && (
        <>
          <MainHeader>
          </MainHeader>
          <ul className="wishlist stay-list">
            {favList.map((stay) => (
              < StayPreview
                key={stay._id}
                stay={stay}
                params={params}
              />
            ))}
          </ul>
        </>
      )}
    </>
  )
}
