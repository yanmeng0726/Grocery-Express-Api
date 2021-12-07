import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import OutlinedInput from '@mui/material/OutlinedInput';

import Grid from '@mui/material/Grid';

export const NewItemDialog = (props) =>{
    const [weight, setWeight] = React.useState(0.0);
    const [weightErr, setWeightErr] = React.useState(false);
    const [name, setName] = React.useState("");
    const [nameErr, setNameErr ] = React.useState(false);
    const [price, setPrice] = React.useState(0.0);
    const [priceErr, setPriceErr ] =React.useState(false)
    
    const handleWeightChange=(event)=>{
       setWeight(event.target.value);
       var regExp = /[a-zA-Z]/g;
       if(event.target.value <= 0|| regExp.test(event.target.value)){
         setWeightErr(true);
       }
       else{
        setWeightErr(false);
       } 
    }

    const handleNameChange = (event)=>{
        setName(event.target.value);
        if(event.target.value.length <= 0){
          setNameErr(true)
        }
        else{
          setNameErr(false)
        } 
     }

     const handlePriceChange = (event)=>{
        setPrice(event.target.value);
        var regExp = /[a-zA-Z]/g;
        if(event.target.value<=0 || regExp.test(event.target.value)){
          setPriceErr(true)
        }
        else{
          setPriceErr(false) 
        } 
     }

     const handleConfirm =() =>{
       if(nameErr||priceErr||weightErr||weight<=0 ||price<=0 ||name.length<=0){
         alert("Please check you input!")
         return;
       }
      props.handleConfirm(props.id,name,weight,price);
    }  
    
    return (
      <div>
        <Dialog open={props.open}>
          <DialogTitle>
              {`Add new item(s) to ${props.name}`} 
          </DialogTitle>
          <DialogContent>
          <Grid>
          <Grid>Name:</Grid>      
          <OutlinedInput
            error={nameErr}
            id="outlined-adornment-name"
            value={name}
            onChange={handleNameChange}
            inputProps={{
              'aria-label': 'Name',
            }}
          />
          </Grid>
          <Grid>
          <Grid>Weight(Kg):</Grid>    
          <OutlinedInput
            error={weightErr}
            id="outlined-adornment-weight"
            value={weight}
            onChange={handleWeightChange}
            inputProps={{
              'aria-label': 'Weight',
            }}
          />
          </Grid>
          <Grid>
          <Grid>Unit Price($):</Grid>
          <OutlinedInput
            error={priceErr}
            id="outlined-adornment-price"
            value={price}
            onChange={handlePriceChange}
           
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
