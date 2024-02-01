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
  const [trips, setTrips] = useState(loggedInUser.myOrder || [])



  useEffect(() => {
    hostUser();
    socketService.on(SOCKET_ADD_ORDER, (newOrder) => {
      console.log('newOrder', newOrder)
      setHost((prevHost) => ({ ...prevHost, myGuests: [newOrder, ...prevHost.myGuests] }))
    })

    socketService.on(SOCKET_ORDER_STATUS_UPDATED, newStatus => {
      console.log('newStatus', newStatus);

      //action
      console.log('trips', trips)

      const updatedTrips = trips.map(trip => {
        if (trip.id === newStatus.orderId) {
          console.log('hi!!!!!!!!!!!!!!!!!')
          return { ...trip, status: newStatus.newStatus }
        } else {
          return trip
        }

      })
      console.log('updatedTrips', updatedTrips);
      setTrips(updatedTrips)

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

  function ChangeStatus(status, orderId) {
    console.log(
      'ChangeStatus called with status:',
      status,
      'and orderId:',
      orderId
    )
    socketService.emit(SOCKET_ORDER_STATUS_UPDATED, {
      orderId,
      newStatus: status
    })
    setStatus(status)
  }
  return (
    <div className='myTripTable'>
      <div className='header-row'>
        <div className='header-cell photoNameCell'>Stay</div>
        <div className='header-cell'>Host</div>
        <div className='header-cell'>Dates</div>
        <div className='header-cell'>Total</div>
        <div className='header-cell'>Status</div>
      </div>
      {console.log(loggedInUser)}
      {trips &&
        trips.slice().reverse().map((order, index) => (
          <div className='row' key={index}>
            <div className='stayImgName'>
              <img src={order.stayImg} alt="" />
              <div className='stayLoc'>
                {order.name ? capitalizeFirstLetter(order.stayLoc) : ''}
              </div>
            </div>
            <div className='host cell'>{order.hostName}</div>
            <div className='date-cell'>
              <span className='checkIn cell'>{stayService.formatDateFromUnix(order.check_In)} - {stayService.formatDateFromUnix(order.check_Out)}</span>
            </div>
            <div className='price cell'>{`$${order.price || 0}`}</div>
            <div className={`status cell ${order.status.toLowerCase()}`}>{order.status}</div>
          </div>
        ))}
    </div>
  );
}
