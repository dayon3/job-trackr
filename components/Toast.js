import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({ open, close, message, title, duration, severity, bg }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={duration ? duration : null}
      onClose={duration ? close : null}
    >
      <Alert
        onClose={close}
        severity={severity}
        sx={{
          width: '100%',
          backgroundColor: `${bg}`,
          p: `${bg ? '0 12px' : ''}`
        }}
      >
        {title && <AlertTitle>Success!</AlertTitle>} {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
