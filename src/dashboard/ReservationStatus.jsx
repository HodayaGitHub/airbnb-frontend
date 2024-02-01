import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function ReservationStatus() {
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);
  let totalPending = 0;

  useEffect(() => {
    totalPending = clacPending();
  }, []);

  function clacPending() {
    return loggedInUser.myGuests.reduce((acc, guest) => {
      if (guest.status === 'Pending') {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  return (
    <section className='res-status'>
      <h3 className="info-title">Reservations status</h3>
      <div className='chaty'>
        <div className="status-info">
          <span className="status-name">Pending</span>
          <span className="status-count pending">6</span>
        </div>
        <div className="status-info">
          <span className="status-name">Approved</span>
          <span className="status-count approved">3</span>
        </div>
        <div className="status-info">
          <span className="status-name">Rejected</span>
          <span className="status-count rejected">1</span>
        </div>
      </div>
    </section>
  );
}
