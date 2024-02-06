import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { event } from 'jquery';
import { useState } from 'react'
//LOGIN
import { login } from '../store/actions/user.actions';
import { userService } from '../services/user.service.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 520,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  }

  const stopProp = (event) => {
    event.stopPropagation();
  }
  const handleClose = () => setOpen(false);

  function handleCredentialsChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((credentials) => ({ ...credentials, [field]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    console.log('hello')
    try {
      const user = await login(credentials)
      console.log('user:', user)
      setOpen(false)
      window.location.reload();
    } catch (err) {
    }
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }



  async function handleDemoLogIn() {
    const demoCredentials = {
      fullname: 'joy',
      username: 'joy2210',
      password: '123',
      email: 'defEmail@',
    }
    try {
      const user = await login(demoCredentials)
      setOpen(false)
      window.location.reload();
      console.log('user:', user)
    } catch (err) {
      console.log('err:', err)
    }
  }

  const { username, password } = credentials

  return (
    <div onClick={(event) => handleOpen(event)} className='login-form'>
      <button className='login-btn'>Log in</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='login-modal' onClick={(event) => stopProp(event)}>
            <        h2>Log in</h2>
            <form className='inputs' onSubmit={onSubmit}>

              <label htmlFor="username"><span className='star'>*</span>Username</label>
              <input
                type="text"
                name='username'
                value={username}
                onChange={handleCredentialsChange}
                id='username'
                required
              />

              <label htmlFor="password"><span className='star'>*</span>Password</label>
              <input
                type="password"
                name='password'
                value={password}
                onChange={handleCredentialsChange}
                id='password'
                required
              />
              {/* </form> */}

              <div className='login-button'>
                <button >Log in</button>
              </div>
            </form>
            <div className='demo-button'>
              <button onClick={handleDemoLogIn}>Demo Log in</button>
            </div>
            <button className='close-login-modal' onClick={handleClose}>𝝬</button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}