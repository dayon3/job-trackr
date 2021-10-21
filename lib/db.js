import { db, doc, setDoc, updateDoc, deleteDoc } from './firebase';

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

export async function createJob(userId, uuid, data) {
  try {
    const docRef = await setDoc(doc(db, `users/${userId}/jobs`, `${uuid}`), {
      ...data
    });
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function updateJob(userId, id, data) {
  try {
    const docRef = await updateDoc(doc(db, `users/${userId}/jobs`, id), {
      ...data
    });
    return docRef;
  } catch (e) {
    console.error('Error updating document: ', e);
  }
}

export async function updateColJobIds(userId, stage, data) {
  try {
    const docRef = await updateDoc(doc(db, `users/${userId}/columns`, stage), {
      ...data
    });
    return docRef;
  } catch (e) {
    console.error('Error updating document: ', e);
  }
}

export async function deleteJob(userId, id) {
  try {
    await deleteDoc(doc(db, `users/${userId}/jobs`, id));
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
}
