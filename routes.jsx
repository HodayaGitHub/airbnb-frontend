import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { StayEdit } from './pages/StayEdit.jsx'
import { ConfirmPage } from './pages/ConfirmStay.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { Wishlist } from './pages/Wishlist.jsx'
import { Trips } from './pages/Trips.jsx'
import { DashBoard } from './pages/DashBoard.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <StayIndex />,
        label: 'Stays'
    },
    {
        path: 'review',
        component: <ReviewIndex />,
        label: 'Reviews'
    },
    {
        path: 'chat',
        component: <ChatApp />,
        label: 'Chat'
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    },
    {
        path: 'admin',
        component: <AdminApp />,
        label: 'Admin Only'
    },
    {
        path: '/stay/:stayId',
        component: <StayDetails />,
        label: 'Details'
    },
    {
        path: 'edit',
        component: <StayEdit />,
        label: 'Edit'
    },
    {
        path: 'book/:stayId',
        component: <ConfirmPage />,
        label: 'Confirm'
    },
    {
        path:'wishlist',
        component: <Wishlist />,
        label: 'Wishlist'
    },
    {
        path:'trips',
        component: <Trips />,
        label: 'Trips'
    },
    {
        path:'dashBoard',
        component: <DashBoard />,
        label: 'dashBoard'
    }

]

export default routes