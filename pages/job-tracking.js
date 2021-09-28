import { DragDropContext } from 'react-beautiful-dnd';
import useSWR from 'swr';

import { InterviewIcon } from '@/components/icons/InterviewIcon';
import { OfferIcon } from '@/components/icons/OfferIcon';
import { RejectedIcon } from '@/components/icons/RejectedIcon';
import { WishlistIcon } from '@/components/icons/WishlistIcon';
import AppliedIcon from '@/components/icons/AppliedIcon';
import Column from '@/components/Column';
import DashboardShell from '@/components/DashboardShell';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import fetcher from 'utils/fetcher';
import { useAuth } from '@/lib/auth';

const JobTracking = () => {
  const auth = useAuth();
  const { data } = useSWR('/api/jobs', fetcher);

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

  if (!data) {
    return (
      <DashboardShell>
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column jobs={data.jobs} />
      </DragDropContext>
    </DashboardShell>
  );
};

export default JobTracking;
