import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { logout } from '../store/actions/user.actions.js'
import { useSelector } from 'react-redux'
import { LoginSignupModal } from './LoginSignupModal.jsx'
import { userService } from '../services/user.service.js'
import { StaySearchOnScroll } from '../cmps/search/StaySearchOnScroll.jsx'

import appLogo from '../assets/img/new-logo-svg.svg'
import hamburger from '../assets/img/svgs/hamburger.svg'
import defaultLogo from '../assets/img/svgs/defaultLogo.svg'
import Avatar from '@mui/material/Avatar'

export function MainHeader({ isTop, onSetFilter, filterBy }) {
  const modalRef = useRef(null);
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const navigate = useNavigate()
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsUserModalOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isUserModalOpen])

  function toggleUserModal(event) {
    event.stopPropagation()
    setIsUserModalOpen(!isUserModalOpen)
    if (!isUserModalOpen) {
      setModalType(null)
    }
  }

  async function onLogout() {
    try {
      await logout();
      setIsUserModalOpen(false);
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.log('err:', err);
      showErrorMsg('Cannot logout');
    };
  };

  function goDashboard() {
    navigate('/Dashboard');
  };

  function goToWishlist() {
    navigate(`/wishlist/${user._id}`);
  };

  function handleOpen(event, loginOrSignup) {
    event.stopPropagation();
    setModalType(loginOrSignup);
  };


  return (
    <header className={`app-header  ${!isTop ? 'main-header-on-scroll' : ''}`}>
      <div
        onClick={() => {
          navigate('/')
          window.location.reload()
        }}
        className='logo-container'
      >
        <img src={appLogo} alt='Logo' className='app-logo' />
        <span className="logo-name">Journey</span>
      </div>

      {!isTop && (
        <StaySearchOnScroll
          filterBy={filterBy}
          onSetFilter={onSetFilter}
        />
      )}

      <div className='login' onClick={(event) => toggleUserModal(event)} ref={modalRef}>
        <img className='hamburger' src={hamburger} />
        {!user ? (
          <img className='logo' src={defaultLogo} alt='user-pic' />
        ) : (
          <Avatar className='user-img' alt='' src={user.imgUrl} />
        )}

        {isUserModalOpen && (
          <div className='user-modal'>
            {!user && (
              <div className='notLogin-user-modal'>

                <div className='login-form' onClick={(event) => handleOpen(event, 'signup')}>
                  <button>Sign up</button>
                  {modalType === 'signup' && (
                    <LoginSignupModal loginOrSignup='signup' />
                  )}

                </div>

                <div className='login-form' onClick={(event) => handleOpen(event, 'login')}>
                  <button>Login</button>
                  {modalType === 'login' && (
                    <LoginSignupModal loginOrSignup='login' />
                  )}

                </div>

              </div>
            )}

            {user && (
              <div className='login-user-modal'>
                <button onClick={goToWishlist}>Wishlist</button>
                <button onClick={() => navigate('/trips')}>Trips</button>
                <button onClick={goDashboard}>Dashboard</button>
                <button onClick={() => navigate('/become-a-host')}>
                  Become a host
                </button>
                <button onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
