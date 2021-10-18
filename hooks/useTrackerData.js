import { useState, useEffect } from 'react';

import { db, collection, query, onSnapshot } from '@/lib/firebase';

const useTrackerData = (userId) => {
  const [jobs, setJobs] = useState(null);
  const [columns, setColumns] = useState(null);
  const [final, setFinal] = useState(null);

  useEffect(() => {
    const q = query(collection(db, `users/${userId}/jobs`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      setJobs(documents);
    });
    return () => {
      unsub();
    };
  }, [userId]);

  useEffect(() => {
    const q = query(collection(db, `users/${userId}/columns`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      setColumns(documents);
    });
    return () => {
      unsub();
    };
  }, [userId]);

  useEffect(() => {
    if (jobs && columns) {
      const finalObject = {};

      const co = columns.find((column) => column.id === 'columnOrder');
      const cols = columns.filter((column) => column.id !== 'columnOrder');

      finalObject.columnOrder = co?.order;
      finalObject.columns = {};
      finalObject.jobs = {};

      jobs.forEach((j) => (finalObject.jobs[j.id] = j));
      cols.forEach((c) => (finalObject.columns[c.id] = c));

      setFinal(finalObject);
    }
  }, [jobs, columns]);

  return { initialData: final, setInitialData: setFinal };
};

export default useTrackerData;
