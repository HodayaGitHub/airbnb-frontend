import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import privacy from '../assets/img/svgs/privacy.svg'
import { checkout } from '../store/actions/stay.actions.js'
import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {

  return (
    <footer className='app-footer main-layout full'>
      {/* <p>Inspiration for future getaways</p> */}
      <div>
        <span>
          @2024 Journey, inc • Terms • Sitemadiv • Privacy • Your Privacy
          Choices <img src={privacy} alt='privacy' />
        </span>
      </div>
      {/* <UserMsg /> */}
    </footer>
  )
}
