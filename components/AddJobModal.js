import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';

import { DescriptionIcon } from './icons/DescriptionIcon';
import { LocationIcon } from './icons/LocationIcon';
import { LinkIcon } from './icons/LinkIcon';
import { SalaryIcon } from './icons/SalaryIcon';
import { JobTitleIcon } from './icons/JobTitleIcon';
import { createJob } from '@/lib/db';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  margin: {
    marginTop: '8px',
    marginBottom: '8px',
    width: '100%'
  },
  flex: {
    display: 'flex'
  },
  input: {
    margin: '0 0.9rem'
  },
  desc: {
    padding: '0.75rem 0'
  }
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
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
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

const AddJobModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onCreateJob = (values) => createJob(values);

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        sx={{
          textTransform: 'none',
          color: '#98a1b3',
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }}
        onClick={handleClickOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#98a1b3"
        >
          <polygon points="13 11 18 11 18 13 13 13 13 18 11 18 11 13 6 13 6 11 11 11 11 6 13 6"></polygon>
        </svg>
        Add Job
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onCreateJob)}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          />
          <DialogContent
            dividers
            sx={{ borderTop: 'none', pt: 4 }}
            className="modal-content"
          >
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={`${classes.margin}`}>
                  <InputLabel>Company</InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    type="text"
                    placeholder="Your Company LLC"
                    autoFocus
                    className={classes.input}
                    // value={job?.company}
                    {...register('company', { required: true })}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="standard-adornment-title">
                    Job Title
                  </InputLabel>
                  <Input
                    id="standard-adornment-title"
                    type="text"
                    placeholder="Web Developer"
                    className={classes.input}
                    // value={job?.title}
                    {...register('title', { required: true })}
                    endAdornment={
                      <InputAdornment position="end" className="mb-1">
                        <JobTitleIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="standard-adornment-salary">
                    Annual Salary
                  </InputLabel>
                  <Input
                    id="standard-adornment-salary"
                    type="text"
                    placeholder="$40,000"
                    className={classes.input}
                    // value={job?.salary}
                    {...register('salary', { required: true })}
                    endAdornment={
                      <InputAdornment position="end" className="mb-1">
                        <SalaryIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="standard-adornment-post-link">
                    Posting Link
                  </InputLabel>
                  <Input
                    id="standard-adornment-post-link"
                    type="text"
                    placeholder="job.com/web-developer"
                    className={classes.input}
                    {...register('link', { required: true })}
                    endAdornment={
                      <InputAdornment position="end" className="mb-1">
                        <LinkIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="standard-adornment-location">
                    Location
                  </InputLabel>
                  <Input
                    id="standard-adornment-location"
                    type="text"
                    placeholder="20th Ave, San Francisco"
                    className={classes.input}
                    // value={job?.location}
                    {...register('location', { required: true })}
                    endAdornment={
                      <InputAdornment position="end" className="mb-1">
                        <LocationIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={`w-full ${classes.margin}`}>
                  <InputLabel htmlFor="standard-adornment-description">
                    Description and notes
                  </InputLabel>
                  <InputBase
                    id="standard-adornment-description"
                    type="text"
                    placeholder="Had an interview September 3rd. Waiting for feedback."
                    className={classes.input}
                    sx={{ py: 2, pb: 5 }}
                    {...register('description', { required: true })}
                    endAdornment={
                      <InputAdornment position="end">
                        <DescriptionIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2, px: 4, backgroundColor: '#e6ebf4' }}>
            <Button variant="contained" autoFocus type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
};

export default AddJobModal;
