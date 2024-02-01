import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/ChatApp.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { StayEdit } from './pages/StayEdit.jsx'
import { ConfirmPage } from './pages/ConfirmStay.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { Wishlist } from './pages/Wishlist.jsx'
import { Trips } from './pages/Trips.jsx'
import { DashBoard } from './pages/DashBoard.jsx'
import { Page1 } from './pages/AddStay/Page1.jsx'
import { Page2 } from './pages/AddStay/Page2.jsx'
import { Page3 } from './pages/AddStay/Page3.jsx'
import { Page4 } from './pages/AddStay/Page4.jsx'
import { Page5 } from './pages/AddStay/Page5.jsx'
import { Page6 } from './pages/AddStay/Page6.jsx'
import { Page7 } from './pages/AddStay/Page7.jsx'
import { Page8 } from './pages/AddStay/Page8.jsx'

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
    path: 'wishlist/:userId',
    component: <Wishlist />,
    label: 'Wishlist'
  },
  {
    path: 'trips',
    component: <Trips />,
    label: 'Trips'
  },
  {
    path: 'dashBoard',
    component: <DashBoard />,
    label: 'dashBoard'
  },
  {
    path: 'become-a-host',
    component: <Page1 />,
    label: 'become-a-host'
  },
  {
    path: 'become-a-host/structure',
    component: <Page2 />,
    label: 'become-a-host-structure'
  },
  {
    path: 'become-a-host/privacy-type',
    component: <Page3 />,
    label: 'become-a-host-privacy-type'
  },
  {
    path: 'become-a-host/location',
    component: <Page4 />,
    label: 'become-a-host-location'
  },
  {
    path: 'become-a-host/floor-plan',
    component: <Page5 />,
    label: 'become-a-host-floor-plan'
  },
  {
    path: 'become-a-host/stand-out',
    component: <Page6 />,
    label: 'become-a-host-stand-out'
  },
  {
    path: 'become-a-host/ementities',
    component: <Page7 />,
    label: 'become-a-host-ementities'
  },
  {
    path: 'become-a-host/photos',
    component: <Page8 />,
    label: 'become-a-host-photos'
  }
]

export default routes
