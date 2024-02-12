import { DynamicModal } from './DynamicModal';
import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { event } from 'jquery'
import { useState } from 'react'
//SIGNUP
import { signup, login } from '../store/actions/user.actions'
import { ImgUploader } from './ImgUploader'
import { uploadService } from '../services/upload.service.js'
import { showimgUploadSuccessMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service.js'


export function LoginSignupModal({ loginOrSignup }) {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials());
  const [isUploading, setIsUploading] = useState(false);


  async function onSubmit(ev) {
    ev.preventDefault();
    try {
      const user = await signup(credentials);
      await login(credentials);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }


  function handleCredentialsChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((credentials) => ({ ...credentials, [field]: value }))
  }

  async function handleDemoLogIn() {
    const demoCredentials = {
      fullname: 'joy',
      username: 'joy2210',
      password: '123',
      email: 'defEmail@',
      imgUrl: '../assets/img/host-img/anonumus-user.png',
      myOrder: [],
      myGuests: [],
    };
    try {
      const user = await login(demoCredentials);
      setOpen(false);
      window.location.reload();
      console.log('user:', user);
    } catch (err) {
      console.log('err:', err);
    }
  }

  async function uploadImg(ev) {
    setIsUploading(true);
    const { secure_url } = await uploadService.uploadImg(ev);
    console.log('secure_url:', secure_url);
    setCredentials({ ...credentials, imgUrl: secure_url });
    setIsUploading(false);
    showimgUploadSuccessMsg(`✅ Img uploaded successfully`);
  }

  const { username, password, fullname, imgUrl } = credentials;

  return (
    <div>
      <h2>Sign up</h2>
      <form className='inputs' onSubmit={onSubmit}>
        <label htmlFor='fullname'>
          <span className='star'>*</span>Fullname
        </label>
        <input
          type='text'
          name='fullname'
          value={fullname}
          onChange={handleCredentialsChange}
          id='fullname'
          required
        />
        <label htmlFor='username'>
          <span className='star'>*</span>Username
        </label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleCredentialsChange}
          id='username'
          required
        />

        <label htmlFor='password'>
          <span className='star'>*</span>Password
        </label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handleCredentialsChange}
          id='password'
          required
        />
        <div className='login-button'>
          {/* <ImgUploader onUploaded={onUploaded} /> */}
          <section className='upload-imgs'>
            <label htmlFor='imgUpload' className='custom-btn'>
              {' '}
              Upload a profile img
            </label>
            <input
              type='file'
              onChange={uploadImg}
              accept='img/*'
              id='imgUpload'
              className='imgUpload'
            />
            {isUploading && (
              <p className='uploading-msg'>Uploading please wait...</p>
            )}
          </section>

          <button>Sign up</button>
        </div>
      </form>
      <div className='demo-button'>
        <button onClick={handleDemoLogIn}>Demo Log in</button>
      </div>
      {/* <button className='close-login-modal' onClick={handleClose}>
        𝝬
      </button> */}
    </div>
  );
}
