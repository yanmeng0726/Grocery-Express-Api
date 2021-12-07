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
import Grid from '@mui/material/Grid';

/*"weight_limit":50.05,
"trips_left": 2,
"status": 2*/

export const NewDroneDialog = (props) =>{
    const [weightlimit, setWeightlimit] = React.useState(0.0);
    const [weightlimitErr, setWeightlimitErr] = React.useState(false);
   
    const handleWeightChange=(event)=>{
       setWeightlimit(event.target.value);
       var regExp = /[a-zA-Z]/g;
       if(event.target.value <= 0|| regExp.test(event.target.value)){
         setWeightlimitErr(true);
       }
       else{
        setWeightlimitErr(false);
       } 
    }

     const handleConfirm =() =>{
       if(weightlimitErr||weightlimit<=0 ){
         alert("Please check you input!")
         return;
       }
      props.handleConfirm(props.id,weightlimit);
    }  
    
    return (
      <div>
        <Dialog open={props.open}>
          <DialogTitle>
              {`Add new item(s) to ${props.name}`} 
          </DialogTitle>
          <DialogContent>
          <Grid>
          <Grid>Weight Limit(Kg):</Grid>    
          <OutlinedInput
            error={weightlimitErr}
            id="outlined-adornment-weight"
            value={weightlimit}
            onChange={handleWeightChange}
            inputProps={{
              'aria-label': 'Weight',
            }}
          />
          </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button onClick={props.handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
