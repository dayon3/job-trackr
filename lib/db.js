import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function createUser(uid, data) {
  try {
    const docRef = await setDoc(
      doc(db, 'users', `${uid}`),
      {
        data
      },
      { merge: true }
    );
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}