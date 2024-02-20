import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateUser } from '../store/actions/user.actions.js';
import { LoginSignupModal } from './LoginSignupModal.jsx';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export function FavoriteIcon({ stay }) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setIsFavorite(loggedInUser?.favoriteStays?.some((favoriteStay) => favoriteStay._id === stay._id));
  },
    [loggedInUser?.favoriteStays, stay._id]);

  // useEffect(() => {
  //   console.log('isFavorite', isFavorite)
  //   if (isFavorite == undefined && !isFavorite && loggedInUser) {
  //     setIsLoginModalOpen(!isLoginModalOpen);
  //   }
  // }, [isFavorite, loggedInUser]);

  async function addToFave(updatedUser) {
    try {
      setIsLoading(true);
      const updatedUserFromDB = await updateUser(updatedUser);
      // console.log('updatedUser: ', updatedUserFromDB);
      setIsLoading(false);
    } catch (err) {
      console.error('Error updating user:', err);
      setIsLoading(false);
    }
  }

  async function handleCheckBoxClick(e) {
    e.stopPropagation();

    if (!loggedInUser) {
      setIsLoginModalOpen(!isLoginModalOpen);
      return
    }
    else {
      try {
        let updatedFavoriteStays;
        const updatedIsFavorite = !isFavorite;
        setIsFavorite(updatedIsFavorite);

        if (updatedIsFavorite) {
          updatedFavoriteStays = [...(loggedInUser.favoriteStays || []), stay];
        } else {
          updatedFavoriteStays = loggedInUser.favoriteStays.filter((favoriteStay) => favoriteStay._id !== stay._id);
        }

        const updatedUser = {
          ...loggedInUser,
          favoriteStays: updatedFavoriteStays,
        };

        addToFave(updatedUser);
      } catch (err) {
        console.error('Failed to update favorite stays', err);
      }
    }
  }

  return (
    <>

      <div className='heart'>
        <Checkbox
          {...label}
          icon={<Favorite style={{ color: "rgb(65 52 52 / 51%)", stroke: "white", strokeWidth: "1px" }} />}
          checkedIcon={<Favorite style={{ color: '#ff385c', stroke: "white", strokeWidth: "2px" }} />}
          onClick={handleCheckBoxClick}
          checked={isFavorite !== undefined ? isFavorite : false}
          disabled={isLoading}
        />
      </div>
      {isLoginModalOpen && (
        <LoginSignupModal loginOrSignup='signup' state={isLoginModalOpen} />
      )}
    </>
  )
}
