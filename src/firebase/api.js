import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./app";

export const createUser = async (email, pass) => {
	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, pass);
		await updateProfile(user, { displayName: email })
		const docRef = await addDoc(collection(db, "users"), {
			uid: user.uid,
			email,
		});
		// if (docRef)
		const todosDocRef = doc(db, 'users/todos');
		// console.log("docRef: ", docRef);
		// console.log("currentUser: ", auth.currentUser);
		return user;

	} catch (err) {
		console.error("Error adding document: ", err);
	}
}

export const signInUser = async (email, pass) => {
	try {
		const { user } = await signInWithEmailAndPassword(auth, email, pass);
		return user;
	} catch (err) {
		return err;
	}
}

export const getGoals = async () => {
	const notesSnapshot = await getDocs(collection(db, "goals"));
	const notesList = [];
	notesSnapshot.docs.forEach((doc) => notesList.push({ ...doc.data(), id: doc.id }));
	return notesList;
};



