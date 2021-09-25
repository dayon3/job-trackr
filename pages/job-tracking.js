// import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { useAuth } from '@/lib/auth';
import styles from '@/styles/JobTracking.module.css';
import DashboardShell from '@/components/DashboardShell';
import AppliedIcon from '@/components/icons/AppliedIcon';
import { InterviewIcon } from '@/components/icons/InterviewIcon';
import { OfferIcon } from '@/components/icons/OfferIcon';
import { RejectedIcon } from '@/components/icons/RejectedIcon';
import { WishlistIcon } from '@/components/icons/WishlistIcon';
import AddJobModal from '@/components/AddJobModal';
// import initialData from '../initial-data';

const JobTracking = () => {
  // const [state, setState] = useState(initialData);
  const auth = useAuth();

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

    // reorder the task id array
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newJobIds = Array.from(start.jobIds);
      newJobIds.splice(source.index, 1);
      newJobIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        jobIds: newJobIds
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      };

      setState(newState);
      return;
    }

    // moving from one list to another
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
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    setState(newState);
  };

  const COLUMN_ICONS = {
    wishlist: <WishlistIcon />,
    applied: <AppliedIcon />,
    interview: <InterviewIcon />,
    offer: <OfferIcon />,
    rejected: <RejectedIcon />
  };

  if (!auth.user) {
    return 'Loading...';
  }

  return (
    <DashboardShell>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.container}>
          <section className={styles.cta}>
            <h2 className="">Job Tracking</h2>
            {/* TODO: add button modal with how to use instructions */}
            <button className={styles.btn}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 19a9 9 0 100-18 9 9 0 000 18zm1.3-13a1.2 1.2 0 11-2.5 0 1.2 1.2 0 012.5 0zm-.3 9V9H9v6h2z"
                ></path>
              </svg>
              <span className={styles.span}>How to use?</span>
            </button>
          </section>

          <section className={styles.wrapper}>
            <AddJobModal />
          </section>
        </div>
      </DragDropContext>
    </DashboardShell>
  );
};

export default JobTracking;
