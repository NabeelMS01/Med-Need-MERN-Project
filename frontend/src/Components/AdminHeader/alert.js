import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AlertContext } from '../../contexts/contexts';
import axios from 'axios';

export default function AlertDialog({data}) {
    const {id, msg }= data
    console.log(id);
  const {openAlert, setOpenAlert} = React.useContext(AlertContext);

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };
 

const handleblock =(id)=>{
    console.log(id);
}


useEffect  ( async() => {
    await axios.get(`/user/${id}`).then((response)=>{
        console.log(response);
    })

    
}, [ ]);
  return (
    <div>
       
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { `Are you sure you want to ${msg} this user`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleblock} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
