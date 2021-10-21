import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import JobForm from '@/components/form/JobForm';
import Toast from './Toast';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const JobModal = ({ job, open, close, allCols, column }) => {
  const [openToast, setOpenToast] = useState(false);

  const handleToastClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <JobForm
          close={close}
          job={job}
          allCols={allCols}
          column={column}
          openToast={setOpenToast}
        />
      </BootstrapDialog>
      <Toast
        open={openToast}
        close={handleToastClose}
        message="We've added your job."
        duration={5000}
        severity="success"
        title
      />
    </>
  );
};

export default JobModal;
