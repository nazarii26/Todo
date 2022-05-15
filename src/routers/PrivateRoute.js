import React, { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './../user/authUser'

const PrivateRoute = () => {
	const { currentUser } = useContext(AuthContext);

	console.log('cc', currentUser)

	return !!currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;