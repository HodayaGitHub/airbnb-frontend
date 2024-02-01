import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export function FavoriteIcon() {

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='heart'>
      <Checkbox
        {...label}
        icon={<Favorite style={{ "color": "rgba(0, 0, 0, 60%)", "stroke": "white", "stroke-width": "2px" }} />}
        checkedIcon={<Favorite style={{ color: '#ff385c', "stroke": "white", "stroke-width": "2px" }} />}
        onClick={handleCheckboxClick}
      />
    </div>
  )
}
