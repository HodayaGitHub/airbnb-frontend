import { useState } from 'react';
import { signup, login } from '../store/actions/user.actions';
import { userService } from '../services/user.service.js';
import { SignUpForm } from './SignUpForm.jsx';
import { SignInForm } from './SignInForm.jsx';
import { DynamicModal } from './DynamicModal';

export function LoginSignupModal({ loginOrSignup, state }) {
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials());
  const [isModalOpen, setModalOpen] = useState(state ? state : true);

  function closeModal() {
    setModalOpen(false);
  }

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
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials((credentials) => ({ ...credentials, [field]: value }));
  }


  async function handleDemoLogIn() {
    try {
      await login(userService.demoCredentials());
      window.location.reload();
    } catch (err) {
      console.log('err:', err);
    }
  }


  return (
    <DynamicModal open={isModalOpen} onClose={closeModal}>
      {loginOrSignup === 'signup' ? (

        <SignUpForm
          setCredentials={setCredentials}
          handleDemoLogIn={handleDemoLogIn}
          handleCredentialsChange={handleCredentialsChange}
          credentials={credentials}
          onSubmit={onSubmit}
          closeModal={closeModal}
        />
      ) : (
        <SignInForm
          setCredentials={setCredentials}
          handleDemoLogIn={handleDemoLogIn}
          handleCredentialsChange={handleCredentialsChange}
          credentials={credentials}
          onSubmit={onSubmit}
          closeModal={closeModal}
        />
      )}
    </DynamicModal>
  );
};
