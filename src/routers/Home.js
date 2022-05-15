import React, { useContext, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from '../firebase/app';
import { AuthContext } from "../user/authUser";
import { Button, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { Goals } from "../components/Goals";
import { getGoals } from "../firebase/api";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
       const data = await getGoals();
       setGoals(data);
    }
  
    fetchData();
  }, []);

  const handleAddGoal = (event) => {
    event.preventDefault();

    try {
      const newGoal = {
        title: title,
        description: description,
        id: Date.now().toString(),
        authorId: currentUser.uid
      }

      // db.collection("goals").doc(currentUser.uid).set(newGoal);
      addDoc(collection(db, "goals"), newGoal);
      setGoals([...goals, newGoal]); 
    }

  catch (err) {
    console.log(err)
    // setErr(err);
  }

  setTitle('');
  setDescription('');
}

  
  
  return (
  <>
    <h1>Hello, {currentUser?.displayName}</h1>
      <button onClick={() => signOut(auth)}>Sign out</button>
    
    <form noValidate autoComplete='off'>
    <TextField
    fullWidth
    label="Goal title"
id="standart-title"
      value={title}
      style={{ marginTop: 15 }}
      onChange={event => setTitle(event.target.value)}
    />
    <TextField
    fullWidth
    label="Goal description"
          id="standart-description"
          value={description}
          style={{ marginTop: 15 }}
      onChange={event => setDescription(event.target.value)}
    />
    
    
    <Button
    type='submit'
          variant='contained'
    color='primary'
    style={{ marginTop: 10 }}
          onClick={handleAddGoal}
        >
          Save
    </Button>

      </form>

  <Goals goals={goals} />
      </>
  );
};

export default Home;