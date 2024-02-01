export function ReservationStatus(){
  return(
    <section className='res-status'>
      <h3 class="info-title">Reservations status</h3>
      <div className='chaty'>
        <div className="status-info">
        <span class="status-name">Pending</span>
        <span class="status-count pending">3</span>
        </div>
        <div className="status-info">
        <span class="status-name">Approved</span>
        <span class="status-count approved">7</span>
        </div>
        <div className="status-info">
        <span class="status-name">Rejected</span>
        <span class="status-count rejected">1</span>
        </div>
      </div>

    </section>
  )
}