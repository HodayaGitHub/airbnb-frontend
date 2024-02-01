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

const getMainLayoutClasses = () => {
  if (location.pathname === '/') {
    return 'main-layout'
  } else if (location.pathname.includes('/stay/')) {
    return 'stay-detail-layout'
  } else if (location.pathname.includes('/book/')) {
    return 'confirm-layout'
  } else if ((location.pathname.includes('/dashBoard'))) {
    return 'dashboard-layout'
  }else{
    return 'main-layout'
  }
}

export function RootCmp() {
  return (
    <main className={getMainLayoutClasses()}>
      <MainHeader />
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
      <AppFooter />
    </main>
  )
}
