import withStyles from '@mui/styles/withStyles';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = withStyles(() => ({
  input: {
    display: 'flex',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#e6ebf4',
    border: 'none',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    '&:hover': {
      color: '#2196f3'
    }
  }
}))(InputBase);

export default BootstrapInput;
