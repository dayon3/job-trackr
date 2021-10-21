import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import styles from '@/styles/Column.module.css';
import JobModal from './JobModal';
import Job from './Job';
import AddIcon from './icons/AddIcon';

const Column = ({ jobs, column, icon, allCols }) => {
  const [open, setOpen] = useState(false);

  return (
    <Stack
      direction="column"
      sx={{
        position: 'relative',
        width: { xs: '80vw', sm: '18rem' },
        borderRadius: '0.125rem',
        marginRight: '2rem',
        marginBottom: '2.5rem'
      }}
      className="column"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: '0.875rem' }}
      >
        <Stack direction="row" alignItems="center">
          {icon}
          <span className={styles.heading}>{column.title}</span>
        </Stack>
        <span className={styles.number}>{jobs?.length}</span>
      </Stack>
      <Droppable droppableId={column.title}>
        {(provided, snapshot) => (
          <Stack
            direction="column"
            sx={{
              position: 'relative',
              maxHeight: '100%',
              marginRight: '2rem',
              width: { xs: '80vw', sm: '18rem' },
              borderRadius: '0.375rem',
              backgroundColor: '#f2f5fa',
              '::before': {
                content: '""',
                position: 'absolute',
                inset: '-0.375rem -0.375rem -0.375rem',
                backgroundColor: 'rgb(230, 235, 244)',
                borderRadius: '0.5rem',
                pointerEvents: 'none',
                opacity: `${snapshot.isDraggingOver ? 1 : 0}`,
                transition: 'opacity 0.2s ease 0s'
              }
            }}
          >
            <Button
              variant="text"
              sx={{
                textTransform: 'none',
                color: '#98a1b3',
                backgroundColor: '#e6ebf4',
                borderRadius: '0.375rem',
                ':hover': {
                  backgroundColor: '#dde3f0'
                }
              }}
              onClick={() => setOpen(true)}
            >
              <AddIcon fill="#98a1b3" />
              Add Job
            </Button>
            <JobModal
              allCols={allCols}
              column={column}
              open={open}
              close={() => setOpen(false)}
            />
            <Stack
              sx={{
                width: 'calc(100% + 0.5rem)',
                position: 'relative',
                overflowY: 'auto',
                height: '70vh',
                flexGrow: '1',
                paddingTop: '0.5rem'
              }}
              className="column"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {jobs
                .slice()
                .reverse()
                .map((job, index) => {
                  if (typeof job === 'undefined') {
                    return;
                  }
                  return (
                    <Job
                      job={job}
                      key={index}
                      index={index}
                      columnDetails={column}
                      allCols={allCols}
                    />
                  );
                })}
              {provided.placeholder}
            </Stack>
          </Stack>
        )}
      </Droppable>
    </Stack>
  );
};

export default Column;
