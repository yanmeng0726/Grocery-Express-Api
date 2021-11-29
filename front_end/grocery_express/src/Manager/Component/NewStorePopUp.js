import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

export const NewStoreDialog = (props) =>{
    const [name, setName] = React.useState("");

    const handleNameChange = (event)=>{
        //Todo: validate input
        console.log(event.target.value)
        setName(event.target.value); 
     }

     const handleConfirm = ( )=>{
       props.handleConfirm(name);
     }

    return (
      <div>
        <Dialog open={props.open}>
          <DialogTitle>
              {`Add Store`} 
          </DialogTitle>
          <DialogContent style={{paddingTop: "20px"}}>
          <TextField
            required
            label="Store Name"
            onChange={handleNameChange}
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button onClick={props.handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
