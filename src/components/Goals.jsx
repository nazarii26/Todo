import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../firebase/app';
import { Goal } from './Goal'


export const Goals = ({ goals }) => {


	useEffect(() => {
		
	// 	const querySnapshot = await getDocs(collection(db, "goals"));
	// 	querySnapshot.forEach((doc) => {
	// 		// doc.data() is never undefined for query doc snapshots
	// 		console.log(doc.id, " => ", doc.data());
	// 	});
	}, [])

	return (
		<>
			{
				goals && goals.map(goal => <Goal goal={goal} key={goal.id} />)
			}
		</>
	)
}