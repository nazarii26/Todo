import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from './routers/Home';
import Login from './routers/Login';
import SignUp from './routers/SignUp';
import PrivateRoute from './routers/PrivateRoute';
import { AuthProvider } from './user/authUser';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Home />} />
          </Route>
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
