/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Query,
	WhereFilterOp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../FirebaseInit';
import { Collections } from '../Types/Collections';

const db = getFirestore(firebaseApp);

// Collections
const charactersRef = collection(db, 'characters');
const encountersRef = collection(db, 'encounters');

interface IQueryProps {
	props: string;
	comparison: WhereFilterOp;
	value: string;
}

export async function getData(
	dataCollection: Collections,
	whereData?: IQueryProps
) {
	try {
		// Current user
		const auth = await getAuth();
		const userID = auth.currentUser?.uid;

		const col = dataCollection === 'characters' ? charactersRef : encountersRef;

		const q: Query = whereData
			? query(
					col,
					where('userID', '==', userID),
					where(whereData.props, whereData.comparison, whereData.value)
			  )
			: query(col, where('userID', '==', userID));

		const documents = await getDocs(q);

		const res: any[] = [];

		documents.forEach((doc) => {
			const data = doc.data();
			res.push({ id: doc.id, ...data });
		});

		return res;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function setData(
	dataCollection: Collections,
	data: any,
	update?: boolean
) {
	try {
		// Current user
		const auth = getAuth();
		const userID = auth.currentUser?.uid;

		const col = dataCollection === 'characters' ? charactersRef : encountersRef;

		const { id, ...rest } = data;

		if (update) {
			const dataRef = doc(col, data.id);

			return await updateDoc(dataRef, { userID: userID, ...rest });
		} else {
			return await addDoc(col, { userID: userID, ...rest });
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function deleteData(dataCollection: Collections, docID: string) {
	try {
		const col = dataCollection === 'characters' ? charactersRef : encountersRef;

		await deleteDoc(doc(col, docID));
	} catch (error) {
		console.log(error);
		return null;
	}
}
