import { Link, useLocation } from 'react-router-dom'
import appLogo from '../assets/img/airbnb.svg'
const DynamicHeader = () => {
  const location = useLocation()

  const getHeaderLayout = () => {
    if (location.pathname === '/') {
      console.log('location.pathname:', location.pathname)
      return <MainHeader />
    } else if (location.pathname.includes('/stay/')) {
      console.log('location.pathname:', location.pathname)
      return <StayDeatailHeader />
    } else {
      return <DefaultHeader />
    }
  }

  return <>{getHeaderLayout()}</>
}

const MainHeader = () => {
  return (
    <header className='app-header'>
      <div className='logo-container'>
        <img src={appLogo} alt='Logo' className='app-logo' />
        {/* <span className='logo-name'>airbnb</span> */}
      </div>
      {/* <nav> */}

      {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}

      {/* {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                } */}
      {/* </nav> */}
    </header>
  )
}

const StayDeatailHeader = () => {
  return (
    <header className='app-header'>
      <div className='logo-container'>
        <img src={appLogo} alt='Logo' className='app-logo' />
        {/* <span className='logo-name'>airbnb</span> */}
      </div>
    </header>
  )
}

const DefaultHeader = () => {
  return (
    <header className='app-header '>
      <div className='logo-container'>
        <img src={appLogo} alt='Logo' className='app-logo' />
        {/* <span className='logo-name'>airbnb</span> */}
      </div>
      {/* <nav> */}

      {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}

      {/* {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                } */}
      {/* </nav> */}
    </header>
  )
}

export default DynamicHeader
