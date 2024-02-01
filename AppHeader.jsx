import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'

import { LoginSignup } from './LoginSignup.jsx'
// import appLogo from '../assets/img/airbnb.svg'
import newlogo from '../assets/img/new-logo-svg.svg'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }
  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <header className='app-header'>
      <div className='logo-container'>
        <img src={newlogo} alt='Logo' className='app-logo' />
        <h1>JourneyJoy</h1>
      </div>
    </header>


    // {/* <span className='logo-name'>airbnb</span> */ }
    //   {/* <nav> */ }

    //   {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */ }

    //   {/* {user &&
    //                     <span className="user-info">
    //                         <Link to={`user/${user._id}`}>
    //                             {user.imgUrl && <img src={user.imgUrl} />}
    //                             {user.fullname}
    //                         </Link>
    //                         <button onClick={onLogout}>Logout</button>
    //                     </span>
    //                 }
    //                 {!user &&
    //                     <section className="user-info">
    //                         <LoginSignup onLogin={onLogin} onSignup={onSignup} />
    //                     </section>
    //                 } */}
    //   {/* </nav> */ }
  )
}
