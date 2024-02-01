import { MyBar } from '../dashboard/MyBar';
import { MyDonut } from '../dashboard/MyDonut';
import { ReservationStatus } from '../dashboard/ReservationStatus';

export function DashBoard(){
  return(
    <section className='dashboard'>
     <MyDonut />
     <ReservationStatus />
     <MyBar />
    </section>
  )
}