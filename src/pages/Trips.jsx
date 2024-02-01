import { useSelector } from 'react-redux';
import { MainHeader } from '../cmps/MainHeader'
import { DataTable } from '../dashboard/DataTable'
import { TripsData } from '../dashboard/tripsData'

export function Trips() {
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);
  return (
    <section className='trips'>
      <MainHeader />
      <h1>My trips</h1>
      <h3>{loggedInUser.myOrder.length} trip{loggedInUser.myOrder.length !== 1 ? <span>s</span> : ''}</h3>      
      <TripsData />
    </section>
  )
}
