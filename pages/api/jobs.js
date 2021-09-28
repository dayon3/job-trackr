import db from '@/lib/firebase-admin';

export default async function handler(_, res) {
  const querySnapshot = await db.collection('jobs').get();
  let jobs = [];

  querySnapshot.forEach((doc) => {
    jobs.push({ id: doc.id, ...doc.data().data });
  });
  res.status(200).json({ jobs });
}
