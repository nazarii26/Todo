import React, { useState } from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, TextField, Typography } from '@mui/material'
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db } from '../firebase/app';

export const Goal = ({ goal }) => {
	console.log('goal', goal);
	const [edit, setEdit] = useState(false)
	const [value, setValue] = useState('');

	const handleDeleteGoal = async (id) => {
		console.log('id', id);
		await deleteDoc(doc(db, "goals", id));
	};

	// const handleEditGoal = (goal) => {
	// 	const updatedGoal = {
	// 		title: value,
	// 		id: goal.id
	// 	}
	// 	// dispatch(editGoal(updatedGoal));
	// 	setEdit(false)
	// }

	return (
		<Card style={{ marginTop: 10, marginBottom: 10 }} >
			<CardActionArea>
				<CardContent>
					{
						edit ? (
							<>
								<TextField
									fullWidth
									label="edit goal"
									value={value}
									onChange={event => setValue(event.target.value)}
								/>
								<Button size="small" color="primary" onClick={() => handleEditGoal(goal)} >
									save
								</Button>
								<Button size="small" color="primary" onClick={() => setEdit(false)}>
									cancel
								</Button>
							</>
						) : (<Typography gutterBottom variant="h5" component="h2">
							{goal.title}
						</Typography>
						)
					}

				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary" onClick={() => handleDeleteGoal(goal.id)}>
					Delete
				</Button>
				<Button size="small" color="primary" onClick={() => { setEdit(true); setValue(goal.title) }}>
					edit
				</Button>
			</CardActions>
		</Card >
	)
}