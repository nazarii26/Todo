import React, { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../user/authUser';
import { signInUser } from '../firebase/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErr] = useState(null);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />
  }

  const signInUserWithEmailAndPasswordHandler = async (email, pass) => {
    try {
      const user = await signInUser(email, pass);
      navigate('/');

    } catch (err) {
      console.log(err)
      setErr(err);
    }
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <h1>Login</h1>
      <TextField id="email" label="email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField id="password" label="password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" onClick={() => signInUserWithEmailAndPasswordHandler(email, password)} >Log in</Button>
      {errMessage ? (<p>{errMessage}</p>) : ('')}
    </>
  )
}

export default Login;