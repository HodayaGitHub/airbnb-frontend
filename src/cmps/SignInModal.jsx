import { useState } from 'react'


export function SignInModal({ handleDemoLogIn, onSubmit, handleCredentialsChange, credentials}) {
  const [open, setOpen] = useState(false);
  const { username, password } = credentials;

  const handleClose = () => setOpen(false);

  return (
    <div className='login-modal'>
      <h2>Sign in</h2>
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
          <button >Log in</button>
        </div>
      </form>
      <div className='demo-button'>
        <button onClick={handleDemoLogIn}>Demo Log in</button>
      </div>
      <button className='close-login-modal' onClick={handleClose}>𝝬</button>

    </div>
  );
}