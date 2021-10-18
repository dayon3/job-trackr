import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({ open, close }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={close}
    >
      <Alert onClose={close} severity="success" sx={{ width: '100%' }}>
        <AlertTitle>Success!</AlertTitle>
        We&apos;ve added your job.
      </Alert>
    </Snackbar>
  );
};

export default Toast;
