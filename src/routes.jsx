import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
// import { ChatApp } from './pages/ChatApp.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { StayEdit } from './pages/StayEdit.jsx'
import { ConfirmPage } from './pages/ConfirmStay.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { Wishlist } from './pages/Wishlist.jsx'
import { Trips } from './pages/Trips.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

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
    path: 'wishlist/:userId',
    component: <Wishlist />,
    label: 'wishlist'
  },
  {
    path: 'trips',
    component: <Trips />,
    label: 'Trips'
  },
  {
    path: 'dashBoard',
    component: <Dashboard />,
    label: 'dashBoard'
  },
  {
    path: '/become-a-host',
    component: <StayEdit />,
    label: 'become-a-host'
  },
]

export default routes
