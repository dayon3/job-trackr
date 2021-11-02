import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuth } from '@/lib/auth';
import { createJob, updateColJobIds, updateJob, deleteJob } from '@/lib/db';
import { serverTimestamp, arrayUnion, arrayRemove } from '@/lib/firebase';
import { DescriptionIcon } from '@/components/icons/DescriptionIcon';
import { LocationIcon } from '@/components/icons/LocationIcon';
import { LinkIcon } from '@/components/icons/LinkIcon';
import { SalaryIcon } from '@/components/icons/SalaryIcon';
import { JobTitleIcon } from '@/components/icons/JobTitleIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import BootstrapDialogTitle from './BootstrapDialogTitle';
import BootstrapInput from './BootstrapInput';
import COLUMN_ICONS from '@/utils/icons';
import usePrevious from '@/hooks/usePrevious';

const useStyles = makeStyles(() => ({
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
}));

const JobForm = ({ close, job, allCols, column, openToast }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const userId = user?.uid;
  const [stage, setStage] = useState(column?.title);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // TODO: add form error handling
  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      company: job ? job.company : '',
      title: job ? job.title : '',
      salary: job ? job.salary : '',
      link: job ? job.link : '',
      location: job ? job.location : '',
      description: job ? job.description : ''
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCreateJob = async (data) => {
    setLoading(true);
    const { company, description, link, location, salary, title } = data;
    const uuid = uuidv4();

    const newJob = {
      dateAdded: serverTimestamp(),
      company,
      title,
      salary,
      link,
      location,
      description
    };

    await createJob(userId, uuid, newJob);
    await updateColJobIds(userId, stage, { jobIds: arrayUnion(uuid) });
    setLoading(false);
    close();
    openToast(true);
  };

  const prevStage = usePrevious(stage);

  const onUpdateJob = async (data) => {
    const id = job.id;
    try {
      setLoading(true);
      await updateJob(userId, id, data);
      if (prevStage) {
        await updateColJobIds(userId, prevStage, {
          jobIds: arrayRemove(id)
        });
        // update timestamp
        await updateJob(userId, id, { dateAdded: serverTimestamp() });
        await updateColJobIds(userId, stage, { jobIds: arrayUnion(id) });
      }
      setLoading(false);
      close();
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteJob = async () => {
    setOpen(false);
    close();
    await updateColJobIds(userId, stage, { jobIds: arrayRemove(job.id) });
    await deleteJob(userId, job.id);
  };

  return (
    <>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(job ? onUpdateJob : onCreateJob)}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={close} />
        <DialogContent
          dividers
          sx={{ borderTop: 'none', mb: 'auto', px: { xs: 1, md: 3 } }}
          className="modal-content"
        >
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-with-icon-adornment">
                  Company
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  type="text"
                  placeholder="Your Company LLC"
                  autoFocus
                  className={classes.input}
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
                  {...register('title', { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
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
                  {...register('salary', { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
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
                  {...register('link')}
                  endAdornment={
                    <InputAdornment position="end">
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
                  {...register('location', { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      <LocationIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-description">
                  Description and notes
                </InputLabel>
                <InputBase
                  id="standard-adornment-description"
                  type="text"
                  placeholder="Had an interview September 3rd. Waiting for feedback."
                  className={classes.input}
                  sx={{ py: 2, pb: 5, alignItems: 'flex-start' }}
                  multiline
                  maxRows={10}
                  {...register('description')}
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
        <DialogActions
          sx={{
            p: 2,
            px: { xs: 1.5, md: 3 },
            backgroundColor: '#e6ebf4',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            onClick={handleClickOpen}
            variant="text"
            startIcon={<DeleteIcon />}
            sx={{
              color: '#98a1b3',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            Delete
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ p: 3 }}
          >
            <BootstrapDialogTitle
              sx={{ p: 3, pb: 0, fontWeight: 'bold' }}
              id="alert-dialog-title"
              onClose={handleClose}
            >
              Delete job
            </BootstrapDialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this job?
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={onDeleteJob}
                sx={{ textTransform: 'none' }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: 'rgb(33, 150, 243)',
                  boxShadow: 'none',
                  textTransform: 'none',
                  ml: '20px',
                  '&:hover': {
                    backgroundColor: 'rgb(22, 138, 230)',
                    boxShadow: 'none'
                  }
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              {COLUMN_ICONS[`${stage?.toLowerCase()}`]}
              <Select
                value={stage}
                onChange={(event) => setStage(event.target.value)}
                name="stage"
                input={<BootstrapInput />}
                inputProps={{ 'aria-label': 'stage' }}
              >
                {allCols?.map((col) => (
                  <MenuItem key={col} value={col}>
                    <span>{col}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              sx={{
                backgroundColor: 'rgb(33, 150, 243)',
                boxShadow: 'none',
                textTransform: 'none',
                ml: '1rem',
                '&:hover': {
                  backgroundColor: 'rgb(22, 138, 230)',
                  boxShadow: 'none'
                }
              }}
            >
              {job ? 'Update' : 'Save'}
            </LoadingButton>
          </Box>
        </DialogActions>
      </form>
    </>
  );
};

export default JobForm;
