import Stack from '@mui/material/Stack';
import AddJobModal from './AddJobModal';

import styles from '@/styles/Column.module.css';
import Job from './Job';

const Column = ({ jobs }) => {
  return (
    <Stack
      direction="column"
      sx={{
        position: 'relative',
        width: '20rem',
        borderRadius: '0.125rem',
        marginRight: '2rem'
      }}
      className="column"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: '14px' }}
      >
        <h3 className={styles.heading}>Wishlist</h3>
        <span className={styles.number}>{jobs.length}</span>
      </Stack>
      <Stack
        direction="column"
        sx={{
          padding: '0',
          position: 'relative',
          maxHeight: '100%',
          marginRight: '2rem',
          width: '20rem',
          borderRadius: '0.125rem'
        }}
      >
        <AddJobModal />
        <Stack
          sx={{
            width: 'calc(100% + 8px)',
            position: 'relative',
            overflowY: 'auto',
            flexGrow: '1',
            paddingTop: '8px'
          }}
          className="column"
        >
          {jobs.map((job) => (
            <Job job={job} key={job.id} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Column;
