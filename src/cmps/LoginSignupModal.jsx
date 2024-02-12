import * as React from 'react'
import { useState } from 'react'
//SIGNUP
import { signup, login } from '../store/actions/user.actions'
import { userService } from '../services/user.service.js'
import { SignUpModal } from './SignUpModal.jsx';
import { SignInModal } from './SignInModal.jsx';


export function LoginSignupModal({ loginOrSignup }) {
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials());


  async function onSubmit(ev) {
    ev.preventDefault();
    try {
      if (loginOrSignup === 'signup') {
        await signup(credentials);
      }
      await login(credentials);
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
    try {
      await login(userService.demoCredentials);
      window.location.reload();
    } catch (err) {
      console.log('err:', err);
    }
  }


  return (
    loginOrSignup === 'signup' ? (
      <SignUpModal
        setCredentials={setCredentials}
        handleDemoLogIn={handleDemoLogIn}
        handleCredentialsChange={handleCredentialsChange}
        credentials={credentials}
        onSubmit={onSubmit} />
    ) : (
      <SignInModal
        setCredentials={setCredentials}
        handleDemoLogIn={handleDemoLogIn}
        handleCredentialsChange={handleCredentialsChange}
        credentials={credentials}
        onSubmit={onSubmit} />
    )
  );
}
