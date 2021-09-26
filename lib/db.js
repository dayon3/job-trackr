import { db, collection, doc, addDoc, setDoc } from './firebase';

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

export async function createJob(data) {
  try {
    const docRef = await addDoc(collection(db, 'jobs'), {
      data
    });
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
