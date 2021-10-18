import db from '@/lib/firebase-admin';

export default async function handler(_, res) {
  const querySnapshot = await db.collection('columns').get();
  let columns = {};

  querySnapshot.forEach((doc) => {
    columns[doc.id] = { ...doc.data() };
  });
  res.status(200).json({ columns });
}
