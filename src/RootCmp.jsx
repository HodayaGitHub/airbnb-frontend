import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import routes from './routes'

import { Provider } from 'react-redux'
import { store } from './store/store.js'

// import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { StayDetails } from './pages/StayDetails.jsx'
import { MainHeader } from './cmps/MainHeader.jsx'

const getMainLayoutClasses = (pathname) => {
  if (pathname === '/') {
    return 'main-layout'
  } else if (pathname.includes('/stay/')) {
    return 'stay-detail-layout'
  } else if (pathname.includes('/book/')) {
    return 'confirm-layout'
  } else if (pathname.includes('/DashBoard')) {
    return 'dashboard-layout'
  } else if (pathname.includes('/trips')) {
    return 'trips-layout'
  } else return 'main-layout'
}

export function RootCmp() {
  const location = useLocation(); // Import useLocation from 'react-router'
  const showFooter = !location.pathname.includes('/become-a-host')

  return (
    <main className={getMainLayoutClasses(location.pathname)}>
      {/* <MainHeader /> */}
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            exact={true}
            element={route.component}
            path={route.path}
          />
        ))}
        <Route path='user/:id' element={<UserDetails />} />
      </Routes>
      {showFooter && <AppFooter />}
    </main>
  )
}
