import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { socketService, SOCKET_ORDER_STATUS_UPDATED } from '../services/socket.service.js';
import { userService } from '../services/user.service.js';
import { stayService } from '../services/stay.service.js';
import { ApprovedButton } from '../dashboard/ApprovedButton.jsx';
import { RejectdButton } from '../dashboard/RejectButton.jsx';

import img1 from '../assets/img/host-img/stay-host-img.jpg';

export default function DivTable() {
  const [isStatus, setStatus] = useState('pending');
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser);
  const [host, setHost] = useState(null);

  useEffect(() => {
    hostUser();
  }, []);

  async function hostUser() {
    try {
      const hostUser = await userService.getByUsername(loggedInUser.username);
      setHost(hostUser);
    } catch (err) {
      console.error('Failed to update order', err);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function ChangeStatus(status, orderId) {
    console.log('ChangeStatus called with status:', status, 'and orderId:', orderId);
    socketService.emit(SOCKET_ORDER_STATUS_UPDATED, {
      orderId,
      newStatus: status,
    });
    setStatus(status);
  }

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      {host?.myGuests &&
        host.myGuests.map((guest, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px',
              }}
            >
              <Avatar alt={guest.name} src={guest.imgUrl || img1} />
              <div style={{ marginTop: '8px' }}>{guest.name ? capitalizeFirstLetter(guest.name) : ''}</div>
            </div>
            <div style={{ width: '100px', textAlign: 'center' }}>{stayService.formatDateFromUnix(guest.check_In)}</div>
            <div style={{ width: '100px', textAlign: 'center' }}>{stayService.formatDateFromUnix(guest.check_Out)}</div>
            <div style={{ width: '100px', textAlign: 'center' }}>{`$${guest.price || 0}`}</div>
            <div style={{ width: '100px', textAlign: 'center' }}>{guest.status}</div>
            <div style={{ width: '100px', textAlign: 'center' }}>
              <button className='dashboard-btn approve' onClick={() => ChangeStatus('Approve', guest._id)}>
                Approve
              </button>
            </div>
            <div style={{ width: '100px', textAlign: 'center' }}>
              <button className='dashboard-btn reject' onClick={() => ChangeStatus('Reject', guest._id)}>
                Reject
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

