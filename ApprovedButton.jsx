export function ApprovedButton() {
  function changeStatus() {
    return 'Approve'
  }
  return (
    <button onClick={changeStatus} className='dashboard-btn approve'>
      Approve
    </button>
  )
}
