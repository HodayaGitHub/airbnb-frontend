import { useState } from 'react'
import { uploadService } from '../services/upload.service.js'
import {showimgUploadSuccessMsg} from '../services/event-bus.service'

export function SignUpModal({ setCredentials, handleCredentialsChange, handleDemoLogIn, credentials, uploadImg, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const handleClose = () => setOpen(false);

  async function uploadImg(ev) {
    setIsUploading(true);
    const { secure_url } = await uploadService.uploadImg(ev);
    setCredentials({ ...credentials, imgUrl: secure_url });
    setIsUploading(false);
    showimgUploadSuccessMsg(`✅ Img uploaded successfully`);
  }


  const { username, password, fullname } = credentials;

  return (
    <div className="login-modal">
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
      <button className='close-login-modal' onClick={handleClose}>𝝬</button>
    </div>
  );
}
