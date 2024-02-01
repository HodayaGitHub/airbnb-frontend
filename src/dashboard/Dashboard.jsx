import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_ORDER_STATUS_UPDATED, SOCKET_ADD_ORDER } from '../services/socket.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.js'

import img1 from '../assets/img/host-img/stay-host-img.jpg'

export default function Dashboard() {
  const [isStatus, setStatus] = useState('pending');
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);
  const [host, setHost] = useState(null);

  useEffect(() => {
    hostUser();
    socketService.on(SOCKET_ADD_ORDER, (newOrder) => {
      console.log('newOrder', newOrder)
      setHost((prevHost) => ({ ...prevHost, myGuests: [newOrder, ...prevHost.myGuests] }))
    })
  }, [])


  useEffect(() => {
    console.log('host', host?.myGuests);
  }, [host])



  async function hostUser() {
    try {
      const hostUser = await userService.getByUsername(loggedInUser.username)
      setHost(hostUser)
    } catch (err) {
      console.error('Failed to update order', err)
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function changeStatus(status, orderId) {
    // console.log(
    //   'ChangeStatus called with status:',
    //   status,
    //   'and orderId:',
    //   orderId
    // )
    console.log('status:', status)
    console.log('orderId:', orderId)
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
    <div className='myTable'>
      <div className='header-row'>
        <div className='header-cell photoNameCell'>Guest</div>
        <div className='header-cell'>Check-In</div>
        <div className='header-cell'>Check-Out</div>
        <div className='header-cell'>Price</div>
        <div className='header-cell'>Status</div>
        <div className='header-cell'></div>
        <div className='header-cell'></div>
      </div>
      {host?.myGuests &&
        host.myGuests.map((guest, index) => (
          <div className='row' key={index}>
            <div className='photoName'>
              <Avatar alt={guest.name} src={guest.guestImg} />
              <div className='userName'>
                {guest.name ? capitalizeFirstLetter(guest.name) : ''}
              </div>
            </div>
            <div className='checkIn cell'>
              {stayService.formatDateFromUnix(guest.check_In)}
            </div>
            <div className='checkOut cell'>
              {stayService.formatDateFromUnix(guest.check_Out)}
            </div>
            <div className='price cell'>{`$${guest.price || 0}`}</div>
            <div className='status cell' style={{
              color: guest.status === 'Approve' ? 'green' : '',
              fontSize: '1rem',
              fontWeight: 600
            }}>
              {guest.status === 'Approve' ? 'Approved' : guest.status}
            </div>


            <div className='approve-btn cell'>
              <button
                className='dashboard-btn approve'
                onClick={() => changeStatus('Approve', guest.id)}
              >
                Approve
              </button>
            </div>
            <div className='reject-btn cell'>
              <button
                className='dashboard-btn reject'
                onClick={() => changeStatus('Reject', guest.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}
