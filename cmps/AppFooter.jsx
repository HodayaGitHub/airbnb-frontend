import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { checkout } from '../store/actions/stay.actions.js'
import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {

  const count = useSelector((storeState) => storeState.userModule.count)



  return (
    <footer className='app-footer full'>
<<<<<<< HEAD
      <p>Inspiration for future getaways</p>
      
=======
      <p>coffeerights - count: {count}</p>

      <UserMsg />
>>>>>>> host-dashboard
    </footer>
  )
}
