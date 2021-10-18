import { db, doc, setDoc } from '@/lib/firebase';

export const createBoardWithDemoData = async (userId) => {
  const jobs = [
    {
      id: '1',
      company: 'Andela',
      title: 'JavaScript Developer',
      salary: '$ 120,000',
      location: 'Remote',
      tag: 'demo',
      dateAdded: new Date()
    },
    {
      id: '2',
      company: 'Netlify',
      title: 'Senior Cloud Architect',
      salary: '$ 120,000',
      location: 'San Francisco',
      tag: 'demo',
      dateAdded: new Date()
    },
    {
      id: '3',
      company: 'Vercel',
      title: 'Senior Cloud Architect',
      salary: '$ 120,000',
      location: 'San Francisco',
      tag: 'demo',
      dateAdded: new Date()
    }
  ];

  const columns = [
    { title: 'Wishlist', jobIds: ['1', '2'] },
    { title: 'Applied', jobIds: ['3'] },
    { title: 'Interview', jobIds: [] },
    { title: 'Offer', jobIds: [] },
    { title: 'Rejected', jobIds: [] }
  ];

  const columnOrder = {
    id: 'columnOrder',
    order: ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected']
  };

  await setDoc(doc(db, `users/${userId}/columns`, 'columnOrder'), columnOrder);

  columns.forEach(async (column) => {
    await setDoc(doc(db, `users/${userId}/columns`, column.title), {
      title: column.title,
      jobIds: column.jobIds
    });
  });

  jobs.forEach(async (job) => {
    await setDoc(doc(db, `users/${userId}/jobs`, job.id), job);
  });
};
