import React, { useState } from 'react'
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import Modal from '@mui/material/Modal';

export const Auth = ({ uid, setUID }) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const toggleSignIn = () => setShowSignIn(value => !value); // toggle fuction for sign in and sign up 

  return (
    <Modal
      open={uid === ""}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {showSignIn ? <SignIn setUID={setUID} toggleSignIn={toggleSignIn} /> : <SignUp setUID={setUID} toggleSignIn={toggleSignIn} />}
    </Modal>
  )
}