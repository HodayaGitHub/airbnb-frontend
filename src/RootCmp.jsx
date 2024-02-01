import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'

import { Provider } from 'react-redux'
import { store } from './store/store.js'


import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { StayDetails } from './pages/StayDetails.jsx'

export function RootCmp() {

    return (
        <section className="main-layout">
            <AppHeader />

            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                {/* <Route element={<StayDetails />} path='/stay/:stayId' /> */}
                </Routes>
            </main>

            <AppFooter />
        </section>

    )
}


