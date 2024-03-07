import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function ReservationStatus() {
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);
  let totalPending = 0;

  useEffect(() => {
    totalPending = clacPending();
    console.log('totalPending', totalPending);
  }, []);

  function clacPending(statusToCount) {
    return loggedInUser?.myGuests?.reduce((acc, guest) => {
      if (guest.status === statusToCount) {
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
          <span className="status-count pending">{clacPending('Pending')}</span>
        </div>
        <div className="status-info">
          <span className="status-name">Approved</span>
          <span className="status-count approved">{clacPending('Approve')}</span>
        </div>
        <div className="status-info">
          <span className="status-name">Rejected</span>
          <span className="status-count rejected">{clacPending('Rejected')}</span>
        </div>
      </div>
    </section>
  );
}
