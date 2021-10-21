import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const TextSkeleton = ({ width, height }) => (
  <Skeleton variant="text" width={width} height={height} />
);
const AvatarSkeleton = () => (
  <Skeleton variant="circular" width={28} height={28} />
);

const JobSkeleton = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    sx={{
      backgroundColor: '#fff',
      borderRadius: '0.5rem',
      padding: '1rem',
      mb: '.5rem'
    }}
  >
    <Box sx={{ pb: '1.5rem' }}>
      <TextSkeleton width={100} />
      <TextSkeleton width={160} />
    </Box>
    <AvatarSkeleton />
  </Stack>
);

const Column = ({ one }) => {
  return (
    <Stack
      direction="column"
      sx={{
        position: 'relative',
        width: { xs: '80vw', sm: '18rem' },
        borderRadius: '0.125rem',
        marginRight: '2rem'
      }}
      className="column"
    >
      <TextSkeleton width={100} height={32} />
      <Stack
        direction="column"
        sx={{
          padding: '0',
          position: 'relative',
          maxHeight: '100%',
          marginRight: '2rem',
          width: { xs: '80vw', sm: '18rem' },
          borderRadius: '0.125rem'
        }}
      >
        <TextSkeleton height={48} />
        <Stack
          sx={{
            width: '100%',
            position: 'relative',
            overflowY: 'auto',
            flexGrow: '1'
          }}
          className="column"
        >
          {one ? (
            <JobSkeleton />
          ) : (
            <>
              <JobSkeleton />
              <JobSkeleton />
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

const DashboardSkeleton = () => {
  return (
    <>
      <Column />
      <Column one />
      <Column />
      <Column one />
      <Column />
    </>
  );
};

export default DashboardSkeleton;
