import { useState } from 'react'
import { ButtonHover } from './ButtonHover';

export function SignInForm({ handleDemoLogIn, onSubmit, handleCredentialsChange, credentials, closeModal }) {
  const [open, setOpen] = useState(true);
  const { username, password } = credentials;


  return (
    <div className='login-modal'>
      <h2>Login</h2>
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

        <div className='login-button'>
          <ButtonHover buttonContent="Sign in" onSubmit={onSubmit} />
        </div>
      </form>
      <div className='demo-button'>
        {/* <button onClick={(e) => handleDemoLogIn(e)}>Demo Log in</button> */}
        <button onClick={handleDemoLogIn}>Demo Log in</button>
      </div>
      {/* <button className='close-login-modal' onClick={(e) => closeModal(e)}>𝝬</button> */}
      <button className='close-login-modal' onClick={closeModal}>𝝬</button>
    </div>
  );
}