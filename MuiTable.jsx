import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableVirtuoso } from 'react-virtuoso'
import Avatar from '@mui/material/Avatar'
import { useState, useEffect } from 'react'
import { userService } from '../services/user.service.js'
import { useSelector } from 'react-redux'
import { stayService } from '../services/stay.service.js'
import { socketService , SOCKET_ORDER_STATUS_UPDATED} from '../services/socket.service.js'

// BUTTONS
import { ApprovedButton } from '../dashboard/ApprovedButton.jsx'
import { RejectdButton } from '../dashboard/RejectButton.jsx'

// HARD CODED
import img1 from '../assets/img/host-img/stay-host-img.jpg'
import img2 from '../assets/img/host-img/host.jpg'



export default function MuiTable() {
  const [isStatus, setStatus] = useState('pending')
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedInUser)

  const [host, setHost] = useState(null)

  // let rows
  useEffect(() => {
    hostUser()
  }, [])


  async function hostUser() {
    try {
      const hostUser = await userService.getByUsername(loggedInUser.username)
      console.log(hostUser)
      setHost(hostUser)
    } catch (err) {
      console.error('Failed to update order', err)
    }
  }

  function ChangeStatus(status, orderId) {
    console.log('ChangeStatus called with status:', status, 'and orderId:', orderId)
    socketService.emit(SOCKET_ORDER_STATUS_UPDATED, { orderId, newStatus: status })
    setStatus(status)
  }
  

  const sample = [
    [
      [<Avatar alt='Remy Sharp' src={img1} />, 'Dana'],
      '22/10/2023',
      '29/10/2023',
      'stay name',
      '$456',
      isStatus,
      // <ApprovedButton />,
      <button
        className='dashboard-btn approve'
        onClick={() => ChangeStatus('Approve')}
      >
        Approve
      </button>,
      <button
        className='dashboard-btn reject'
        onClick={() => ChangeStatus('Reject')}
      >
        Reject
      </button>
      // <RejectdButton />
    ]
  ]

  const columns = [
    {
      width: '1fr',
      label: 'Guest',
      dataKey: 'Guest',
      numeric: true
    },
    {
      width: '1fr',
      label: 'Check in',
      dataKey: 'Check in',
      numeric: true
    },
    {
      width: '1fr',
      label: 'Check out',
      dataKey: 'Check out',
      numeric: true
    },
    {
      width: '1fr',
      label: 'Stay name',
      dataKey: 'Stay name',
      numeric: true
    },
    {
      width: '1fr',
      label: 'Price',
      dataKey: 'Price',
      numeric: true
    },
    {
      width: '1fr',
      label: 'Status',
      dataKey: 'status',
      numeric: true
    },
    {
      width: '1fr',
      label: 'Approved',
      dataKey: 'approved',
      numeric: true
    },
    {
      width: '1fr',
      label: 'Rejected',
      dataKey: 'rejected',
      numeric: true
    }
  ]

  useEffect(() => {
    const handleOrderStatusChange = (data) => {
      console.log('Order status changed:', data)
    }

    socketService.on(SOCKET_ORDER_STATUS_UPDATED, handleOrderStatusChange)

    return () => {
      socketService.off(SOCKET_ORDER_STATUS_UPDATED, handleOrderStatusChange)
    }
  }, [])

  const rows = host?.myGuests.map((guest, index) => {
    return {
      id: index,
      cells: [
        [<Avatar alt={guest.guests.name} src={guest.guests.avatar} />, guest.guests.name],
        stayService.formatDateFromUnix(guest.check_In),
        stayService.formatDateFromUnix(guest.check_Out),
        guest.stayName,
        guest.price || 0,
        guest.status,
        <button
          className='dashboard-btn approve'
          onClick={() => ChangeStatus('Approve', guest._id)}
        >
          Approve
        </button>,
        <button
          className='dashboard-btn reject'
          onClick={() => ChangeStatus('Reject', guest._id)}
        >
          Reject
        </button>
      ]
    }
  })



  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
      />
    ),
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    ))
  }

  function fixedHeaderContent() {
    return null
  }

  function rowContent(_index, row) {
    return (
      <TableRow>
        <TableCell
          key='avatar'
          sx={{
            display: 'flex',
            flexDirection: 'column', // Set flex direction to column
            alignItems: 'center',
            justifyContent: 'center',
            width: '217.63px'
          }}
        >
          {row.cells[0][0]}
          <div sx={{ marginTop: '8px' }}>{row.cells[0][1]}</div>
        </TableCell>
        {row.cells.slice(1).map((cell, index) => (
          <TableCell
            key={index}
            align={columns[index + 1]?.numeric ? 'right' : 'center'}
            sx={{
              width: '217.63px', // Set width to 217.63px for each column
              textAlign: 'center',
              gridColumn: `${index + 2} / span 1`
            }}
          >
            {cell}
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <Paper style={{ height: 500, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  )
}
