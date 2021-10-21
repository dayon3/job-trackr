import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

const BootstrapDialogTitle = (props) => {
  const { onClose, children, ...other } = props;

  return (
    <DialogTitle {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            '&:hover': {
              color: 'rgb(33, 150, 243)'
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </IconButton>
      ) : null}
      {children}
    </DialogTitle>
  );
};

export default BootstrapDialogTitle;

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};
