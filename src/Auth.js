import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const auth = getAuth();
	console.log('aaa', auth)

	useEffect(() => {
		onAuthStateChanged(auth, )
	})
}