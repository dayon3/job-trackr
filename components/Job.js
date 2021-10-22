import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import { format as formatDate } from 'date-fns';

import distanceToNow from '@/utils/dateRelative';
import styles from '@/styles/Job.module.css';
import JobModal from './JobModal';
import { LocationIcon } from './icons/LocationIcon';
import { SalaryIcon } from './icons/SalaryIcon';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 28,
      height: 28,
      fontSize: '.85rem',
      fontWeight: 'bold'
    },
    children: `${name.split(' ')[0][0]}`
  };
}

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: 'rgb(17,24,29)'
  },
  tooltip: {
    backgroundColor: 'rgb(17,24,29)',
    fontSize: '12px'
  }
}));

const Job = ({ job, index, columnDetails, allCols }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <JobModal
        job={job}
        open={open}
        close={handleClose}
        column={columnDetails}
        allCols={allCols}
      />
      <Draggable key={job.id} draggableId={job.id} index={index}>
        {(provided, snapshot) => (
          <Stack
            onClick={handleClickOpen}
            direction="column"
            sx={{
              backgroundColor: `${
                snapshot.isDragging ? 'rgba(239, 246, 255, 1)' : '#fff'
              }`,
              boxShadow: `${
                snapshot.isDragging
                  ? 'rgba(207, 214, 230, 0.7) 0px 14px 16px -10px, rgba(207, 214, 230, 0.12) 0px 20px 40px -8px'
                  : ''
              }`,
              borderRadius: '0.5rem',
              cursor: 'pointer !important',
              padding: '1rem',
              mr: '0.25rem',
              mb: '0.5rem',
              maxWidth: { xs: '80vw', md: '18rem' },
              ':focus': {
                outline: 'none',
                boxShadow: 'rgb(33 150 243) 0px 0px 0px 1px inset'
              }
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: '100%' }}
            >
              <div style={{ marginRight: '1rem' }}>
                <div className={styles.company}>{job.company}</div>
                <p className={styles.title}>{job.title}</p>
              </div>
              <Avatar {...stringAvatar(`${job.company}`)} />
            </Stack>
            <Stack
              direction="row"
              alignItems="flex-start"
              sx={{ width: '100%', mt: '0.5rem' }}
            >
              {job.dateAdded && (
                <Tooltip
                  title={`In this column since ${formatDate(
                    job?.dateAdded?.toDate(),
                    'd MMM, kk:mm'
                  )}`}
                  placement="top-start"
                  arrow
                  classes={classes}
                >
                  <span
                    className={`${styles.tag} ${
                      snapshot.isDragging ? styles.tagColor : ''
                    }`}
                  >
                    {distanceToNow(job?.dateAdded?.toDate())}
                  </span>
                </Tooltip>
              )}
              {job.tag && (
                <span
                  className={`${styles.tag} ${
                    snapshot.isDragging ? styles.tagColor : ''
                  }`}
                >
                  Demo
                </span>
              )}
              {job.location && (
                <Tooltip
                  title={job.location}
                  placement="top"
                  arrow
                  classes={classes}
                >
                  <div className={styles.space}>
                    <LocationIcon />
                  </div>
                </Tooltip>
              )}
              {job.salary && (
                <Tooltip
                  title={job.salary}
                  placement="top"
                  arrow
                  classes={classes}
                >
                  <div>
                    <SalaryIcon />
                  </div>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        )}
      </Draggable>
    </>
  );
};

export default Job;
