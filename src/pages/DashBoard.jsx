import { MyBar } from '../dashboard/MyBar'
import { MyDonut } from '../dashboard/MyDonut'
import { ReservationStatus } from '../dashboard/ReservationStatus'
import { MainHeader } from '../cmps/MainHeader.jsx'
import { DataTable } from '../dashboard/DataTable.jsx'
import { MyRevenue } from '../dashboard/MyRevnue.jsx'

export function DashBoard() {
  return (
    <>
      <MainHeader />
      <section className='dashboard'>
        <div className='dashboard-data'>
          <MyDonut />
          <ReservationStatus />
          <MyBar />
          <MyRevenue />
        </div>
          <DataTable />
      </section>
    </>
  )
}
