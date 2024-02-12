import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { logout } from '../store/actions/user.actions.js';
import { useSelector } from 'react-redux';
import { StaySearchOnScroll } from './search/StaySearchOnScroll.jsx';
import { LoginSignupModal } from './LoginSignupModal.jsx'
import { DynamicModal } from './DynamicModal';

import Avatar from '@mui/material/Avatar';
import appLogo from '../assets/img/new-logo-svg.svg';
import hamburger from '../assets/img/svgs/hamburger.svg';
import defaultLogo from '../assets/img/svgs/defaultLogo.svg';

export function MainHeaderOnScroll({ onSetFilter, filterBy, headerClassNames }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalRef = useRef(null)
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

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
            setIsModalOpen(false)
            navigate('/')
            window.location.reload()
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }

    function goDashBoard() {
        navigate('/DashBoard')
    }

    function goToWishlist() {
        navigate(`/Wishlist/${user._id}`)
    }

    return (
        <header className={`app-header main-header-on-scroll ${headerClassNames}`}>

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

            <StaySearchOnScroll
                filterBy={filterBy}
                onSetFilter={onSetFilter}
            />


            <div className='login' onClick={openUserModal} ref={modalRef}>
                <img className='hamburger' src={hamburger} />
                {!user ? (
                    <img className='logo' src={defaultLogo} alt='user-pic' />
                ) : (
                    <Avatar className='user-img' alt='' src={user.imgUrl} />
                )}

                {isModalOpen && (
                    <div className='user-modal'>
                        {!user && (
                            <div className='notLogin-user-modal'>

                                <div className='login-form' onClick={(event) => handleOpen(event, 'signup')}>
                                    <button>Sign Up</button>
                                    {modalType === 'signup' && (
                                        <DynamicModal open={true}>
                                            <LoginSignupModal loginOrSignup='signup' />
                                        </DynamicModal>
                                    )}

                                </div>

                                <div className='login-form' onClick={(event) => handleOpen(event, 'login')}>
                                    <button>Sign In</button>
                                    {modalType === 'login' && (
                                        <DynamicModal open={true}>
                                            <LoginSignupModal loginOrSignup='login' />
                                        </DynamicModal>
                                    )}

                                </div>

                            </div>
                        )}
                        {user && (
                            <div className='login-user-modal'>
                                <button onClick={goToWishlist}>Wishlist</button>
                                <button onClick={() => navigate('/trips')}>Trips</button>
                                <button onClick={goDashBoard}>DashBorad</button>
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
