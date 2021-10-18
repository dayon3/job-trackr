import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import makeStyles from '@mui/styles/makeStyles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useAuth } from '@/lib/auth';
import { createJob, updateColJobIds } from '@/lib/db';
import { serverTimestamp, arrayUnion } from '@/lib/firebase';
import { DescriptionIcon } from '@/components/icons/DescriptionIcon';
import { LocationIcon } from '@/components/icons/LocationIcon';
import { LinkIcon } from '@/components/icons/LinkIcon';
import { SalaryIcon } from '@/components/icons/SalaryIcon';
import { JobTitleIcon } from '@/components/icons/JobTitleIcon';
import BootstrapDialogTitle from './BootstrapDialogTitle';
import BootstrapInput from './BootstrapInput';
import COLUMN_ICONS from '@/utils/icons';

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
  }
}));

const JobForm = ({ close, job, allCols, column, openToast }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const userId = user?.uid;
  const [stage, setStage] = useState(column?.title);

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

  const onCreateJob = async ({
    company,
    description,
    link,
    location,
    salary,
    title
  }) => {
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
    openToast(true);
    close();
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onCreateJob)}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={close} />
        <DialogContent
          dividers
          sx={{ borderTop: 'none', pt: 4 }}
          className="modal-content"
        >
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={classes.margin}>
                <InputLabel>Company</InputLabel>
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
                  {...register('link', { required: true })}
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
          <Button
            variant="contained"
            autoFocus
            type="submit"
            sx={{
              backgroundColor: 'rgb(33, 150, 243)',
              textTransform: 'none',
              ml: '20px',
              '&:hover': {
                backgroundColor: 'rgb(22, 138, 230)'
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

export default JobForm;
