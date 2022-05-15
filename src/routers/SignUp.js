import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Button } from '@mui/material';
import { createUser } from '../firebase/api';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUserWithEmailAndPasswordHandler = async (email, pass) => {
    try {
      const user = await createUser(email, pass);
      console.log({ user })
      navigate('/');

    } catch (err) {
      console.log({ err })
    }
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <h1>SignUp</h1>
      <TextField id="email" label="email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField id="password" label="password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" onClick={() => createUserWithEmailAndPasswordHandler(email, password)} >Sing up</Button>
    </>
  )
}

export default SignUp;