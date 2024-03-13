import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_ORDER_STATUS_UPDATED, SOCKET_ADD_ORDER } from '../services/socket.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.js'

export function DataTable() {
  const [isStatus, setStatus] = useState('pending');
  const [host, setHost] = useState(null);
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);

  useEffect(() => {
    hostUser();
    console.log(host)
    socketService.on(SOCKET_ADD_ORDER, (newOrder) => {
      console.log('newOrder', newOrder)
      setHost((prevHost) => ({ ...prevHost, myGuests: [newOrder, ...prevHost.myGuests] }))
    })
  }, [])


  async function hostUser() {
    try {
      const hostUser = await userService.getById(loggedInUser._id)
      setHost(hostUser)
    } catch (err) {
      console.error('Failed to update order', err)
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function changeStatus(status, orderId) {
    socketService.emit(SOCKET_ORDER_STATUS_UPDATED, {
      orderId,
      newStatus: status,
      userId: loggedInUser._id

    })
    const updatedGuests = host.myGuests.map(order => order.id === orderId ? { ...order, status } : order)
    setHost(prevState => ({ ...prevState, myGuests: [...updatedGuests] }))
    setStatus(status)
  }
  return (
    <div className='dashboard-table'>
      <table>
        <thead>
          <tr className='header-row'>
            <th className='header-cell photoNameCell'>Guest</th>
            <th className='header-cell'>Check-In</th>
            <th className='header-cell'>Check-Out</th>
            <th className='header-cell'>Price</th>
            <th className='header-cell'>Status</th>
            <th className='header-cell'></th>
            <th className='header-cell'></th>
          </tr>
        </thead>
        <tbody>
          {host?.myGuests &&
            host.myGuests.map((guest, index) => (
              <tr className='table-row' key={index}>

                <td className='photo-name'>
                  <Avatar alt={guest.name} src={guest.guestImg} />
                  <div className='guest-name '>
                    {guest.name ? capitalizeFirstLetter(guest.name) : ''}
                  </div>
                </td>

                <td className='checkIn'>
                  {stayService.formatDateFromUnix(+guest.checkIn, true)}
                </td>

                <td className='checkOut'>
                  {stayService.formatDateFromUnix(+guest.checkOut, true)}
                </td>

                <td className='price '>{`$${guest.price || 0}`}</td>

                <td className='status'
                  style={{
                    color: guest.status === 'Approve' ? 'green' : (guest.status === 'Pending' ? 'orange' : ''),
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  {guest.status === 'Approve' ? 'Approved' : (guest.status === 'Pending' ? 'Pending' : guest.status)}
                </td>

                <td className='approve-btn'>
                  <button
                    className='dashboard-btn approve'
                    onClick={() => changeStatus('Approve', guest.id)}
                    disabled={guest.status === 'Approve'}>
                    Approve
                  </button>
                </td>

                <td className='reject-btn'>
                  <button
                    className='dashboard-btn reject'
                    onClick={() => changeStatus('Reject', guest.id)}
                    disabled={guest.status === 'Reject'}>
                    Reject
                  </button>
                </td>

              </tr>
            ))}

        </tbody>
      </table>
    </div>
  )


}
