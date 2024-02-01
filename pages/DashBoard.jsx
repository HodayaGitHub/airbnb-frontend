import { MyBar } from '../dashboard/MyBar'
import { MyDonut } from '../dashboard/MyDonut'
import { ReservationStatus } from '../dashboard/ReservationStatus'
import { MainHeader } from '../cmps/MainHeader.jsx'


export function DashBoard() {
  return (
    <>
      <MainHeader />
      <section className='dashboard'>
        <MyDonut />
        <ReservationStatus />
        <MyBar />
      </section>
    </>
  )
}