import { DragDropContext } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

import Column from '@/components/Column';
import DashboardShell from '@/components/DashboardShell';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import useTrackerData from '@/hooks/useTrackerData';
import { useAuth } from '@/lib/auth';
import { db, doc, updateDoc, serverTimestamp } from '@/lib/firebase';
import COLUMN_ICONS from '@/utils/icons';

export default function JobTracking() {
  const { user } = useAuth();
  const userId = user?.uid;
  const { initialData, setInitialData } = useTrackerData(userId);
  const [windowReady, setWindowReady] = useState(false);
  useEffect(() => {
    setWindowReady(true);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // check if there is no destination
    if (!destination) {
      return;
    }

    // check if the location of the draggable changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // reorder the job id array
    const start = initialData.columns[source.droppableId];
    const finish = initialData.columns[destination.droppableId];

    if (start === finish) {
      const newJobIds = Array.from(finish.jobIds);

      newJobIds.splice(source.index, 1);
      newJobIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...finish,
        jobIds: newJobIds
      };

      const newState = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [finish.id]: newColumn
        }
      };

      setInitialData(newState);
      const docRef = doc(db, `users/${userId}/columns`, start.id);
      updateDoc(docRef, { jobIds: newJobIds }).then(() => {});
      return;
    }

    // moving from one column to another
    const startJobIds = Array.from(start.jobIds);
    startJobIds.splice(source.index, 1);
    const newStart = {
      ...start,
      jobIds: startJobIds
    };

    const finishJobIds = Array.from(finish.jobIds);
    finishJobIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      jobIds: finishJobIds
    };

    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [start.id]: newStart,
        [finish.id]: newFinish
      }
    };
    setInitialData(newState);

    const startDocRef = doc(db, `users/${userId}/columns`, newStart.id);
    updateDoc(startDocRef, { jobIds: startJobIds }).then(() => {});

    const finishDocRef = doc(db, `users/${userId}/columns`, newFinish.id);
    updateDoc(finishDocRef, { jobIds: finishJobIds }).then(() => {});

    const finishJobRef = doc(db, `users/${userId}/jobs`, draggableId);
    updateDoc(finishJobRef, { dateAdded: serverTimestamp() }).then(() => {});
  };

  if (!initialData) {
    return (
      <DashboardShell cta>
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell cta>
      <DragDropContext onDragEnd={onDragEnd}>
        {initialData?.columnOrder?.map((col, index) => {
          const column = initialData?.columns[col];
          const jobs = column.jobIds?.map((job) => initialData?.jobs[job]);
          const icon = COLUMN_ICONS[Object.keys(COLUMN_ICONS)[index]];

          if (windowReady) {
            return (
              <Column
                key={index}
                jobs={jobs}
                column={column}
                icon={icon}
                allCols={initialData.columnOrder}
              />
            );
          }
        })}
      </DragDropContext>
    </DashboardShell>
  );
}
