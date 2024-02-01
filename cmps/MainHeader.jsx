import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
<<<<<<< HEAD

=======
import { useNavigate } from 'react-router'
>>>>>>> host-dashboard
import appLogo from '../assets/img/airbnb.svg'
import hamburger from '../assets/img/svgs/hamburger.svg'
import defaultLogo from '../assets/img/svgs/defaultLogo.svg'
import LoginModal from './LoginModal.jsx'
import SignUpModal from './SignUpModal.jsx'
import { logout } from '../store/actions/user.actions.js'
import { useSelector } from 'react-redux'
<<<<<<< HEAD
import { useNavigate } from 'react-router'

=======
import Avatar from '@mui/material/Avatar'
>>>>>>> host-dashboard
export function MainHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
<<<<<<< HEAD

=======
>>>>>>> host-dashboard
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isModalOpen])



  function openUserModal() {
    setIsModalOpen(!isModalOpen)
  }

  async function onLogout() {
    try {
      await logout()
<<<<<<< HEAD
      // showSuccessMsg('Logout successfully')
      // navigate('/')
      setIsModalOpen(false)
      window.location.reload()
    } catch (err) {
      console.log('err:', err)
      // showErrorMsg('Cannot logout')
    }
  }

  return (
    <header className='app-header'>
      <div onClick={() => {
        navigate('/')
        window.location.reload()
      }} className='logo-container'>
        <img src={appLogo} alt='Logo' className='app-logo' />
      </div>

      <div className='login' onClick={openUserModal} ref={modalRef}>
        <img className='hamburger' src={hamburger} />
        <img className='logo' src={defaultLogo} alt='user-pic' />

        {isModalOpen && (
          <div className='user-modal'>
            {!user && (
              <div className='notLogin-user-modal'>
                <LoginModal />
                <SignUpModal />
              </div>
            )}


            {user && (
              <div className='login-user-modal'>
                <button>Wishlist</button>
                <button>Trips</button>
                <button>DashBorad</button>
                <button onClick={onLogout}>Logout</button>
              </div>
            )}
=======
      setIsModalOpen(false)
      navigate('/')
      window.location.reload()
    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot logout')
    }
  }

  function goDashBoard(){
    navigate('/DashBoard')
  }

  return (
    <header className='app-header'>

      <Link to='/'>
        <div className='logo-container'>
          <img src={appLogo} alt='Logo' className='app-logo' />
        </div>
      </Link>

      <div className='login' onClick={openUserModal} ref={modalRef}>
        <img className='hamburger' src={hamburger} />
        {!user ?  <img className='logo' src={defaultLogo} alt='user-pic' /> : 
        <Avatar className='user-img' alt='' src={user.imgUrl} />}
       

        {isModalOpen && (
          <div className='user-modal'>
           {!user && (
            <div className='notLogin-user-modal'>
              <LoginModal/>
              <SignUpModal />
            </div>
           )}
          
            
            {user && (
            <div className='login-user-modal'>
              <button onClick={()=> navigate('/wishlist')}>Wishlist</button>
              <button onClick={()=> navigate('/trips')}>Trips</button>
              <button onClick={goDashBoard}>DashBorad</button>
              <button onClick={onLogout}>Logout</button>
            </div>
      )}
>>>>>>> host-dashboard
          </div>
        )}
      </div>
    </header>
  )
}
