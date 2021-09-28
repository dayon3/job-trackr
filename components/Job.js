import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

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

const Job = ({ job }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        backgroundColor: '#fff',
        borderRadius: '0.5rem',
        padding: '1rem',
        mr: '4px',
        mb: '0.5rem',
        maxWidth: '20rem'
      }}
    >
      <Box>
        <h3 style={{ margin: 0 }}>{job.company}</h3>
        <p>{job.title}</p>
      </Box>
      <Avatar {...stringAvatar(`${job.company}`)} />
    </Stack>
  );
};

export default Job;
