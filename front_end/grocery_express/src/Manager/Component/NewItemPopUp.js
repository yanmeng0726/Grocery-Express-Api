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

export const FormDialog = (props) =>{
    const [weight, setWeight] = React.useState(0.0);
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0.0);
    
    const handleWeightChange=(event)=>{
       //Todo: validate input
       setWeight(event.target.value); 
    }

    const handleNameChange = (event)=>{
        //Todo: validate input
        setName(event.target.value); 
     }

     const handlePriceChange = (event)=>{
        //Todo: validate input
        setName(event.target.value); 
     }
    
    return (
      <div>
        <Dialog open={props.openAddItem} onClose={props.handleClose}>
          <DialogTitle>
              {`Add new item(s) to ${props.storeName}`} 
          </DialogTitle>
          <DialogContent>
          <OutlinedInput
            id="outlined-adornment-name"
            value={name}
            onChange={handleNameChange}
            inputProps={{
              'aria-label': 'Name',
            }}
          />
          <OutlinedInput
            id="outlined-adornment-weight"
            value={wieght}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            onChange={handleWeightChange}
            inputProps={{
              'aria-label': 'Weight',
            }}
          />
          
          <OutlinedInput
            id="outlined-adornment-price"
            value={price}
            onChange={handlePriceChange}
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
            inputProps={{
              'aria-label': 'Price',
            }}
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.confirmAddItem}>Confirm</Button>
            <Button onClick={props.handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
