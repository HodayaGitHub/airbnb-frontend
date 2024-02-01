import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import Favorite from '@mui/icons-material/Favorite'
import { updateUser } from '../store/actions/user.actions.js'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export function FavoriteIcon({ stay }) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [isLoading, setIsLoading] = useState(false)

  async function addToFave(updatedUser) {
    try {
      setIsLoading(true)
      const updatedUserFromDB = await updateUser(updatedUser)
      console.log('updatedUser: ', updatedUserFromDB)
      setIsLoading(false)
    } catch (err) {
      console.error('Error updating user:', err)
      setIsLoading(false)
    }
  }


  async function handleCheckBoxClick(e) {
    e.stopPropagation()
  
    try {
      const user = await userService.getById(loggedInUser._id)
      let updatedFavoriteStays
      const isStayInFavorites = user.favoriteStays?.some(favoriteStay => favoriteStay._id === stay._id)
      if (isStayInFavorites) {
        updatedFavoriteStays = user.favoriteStays.filter(favoriteStay => favoriteStay._id !== stay._id)
      } else {
        updatedFavoriteStays = [...(user.favoriteStays || []), stay]
      }
  
      const updatedUser = {
        ...user,
        favoriteStays: updatedFavoriteStays,
      }
  
      addToFave(updatedUser)
    } catch (err) {
      console.error('Failed to update favorite stays', err)
    }
  }

  return (
    <div className='heart'>
      <Checkbox
        {...label}
        icon={<Favorite style={{ color: "rgb(65 52 52 / 51%)", stroke: "white", strokeWidth: "1px" }} />}
        checkedIcon={<Favorite style={{ color: '#ff385c', stroke: "white", strokeWidth: "2px" }} />}
        onClick={handleCheckBoxClick}
        disabled={isLoading}
      />
    </div>
  )
}
