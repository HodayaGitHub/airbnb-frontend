import { useState } from 'react'
import { uploadService } from '../services/upload.service.js'
import { showimgUploadSuccessMsg } from '../services/event-bus.service'
import { ButtonHover } from './buttonHover';

export function SignUpForm({ closeModal, setCredentials, handleCredentialsChange, handleDemoLogIn, credentials, uploadImg, onSubmit }) {
  const [isUploading, setIsUploading] = useState(false);
  const { username, password, fullname } = credentials;

  async function uploadImg(ev) {
    setIsUploading(true);
    const { secure_url } = await uploadService.uploadImg(ev);
    setCredentials({ ...credentials, imgUrl: secure_url });
    setIsUploading(false);
    showimgUploadSuccessMsg(`✅ Img uploaded successfully`);
  }


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
        <div className='login-button'>

          <ButtonHover buttonContent="Sign up" onSubmit={onSubmit} />
        </div>
      </form>
      <div className='demo-button'>
        <button onClick={handleDemoLogIn}>Demo Log in</button>
      </div>
      <button className='close-login-modal' onClick={closeModal}>𝝬</button>
    </div>
  );
};
