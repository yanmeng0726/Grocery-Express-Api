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

export const NewPilotDialog = (props) =>{
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [ssn, setSSN] = React.useState("");
    const [license, setLicense] = React.useState(null);
    const [expirationDate, setExpirationDate]=React.useState("")
    const [experience, setExperience] = React.useState(0);
    const [firstNameErr, setFirstNameErr ] = React.useState(false);
    const [lastNameErr, setLastNameErr ] = React.useState(false);
    const [experienceErr, setExperienceErr ] =React.useState(false);
    const [phoneErr, setPhoneErr] = React.useState(false);
    const [ssnErr, setSSNErr] = React.useState(false);
    const [licenseErr, setLicenseErr] = React.useState(false);
    const [expirationDateErr, setExpirationDateErr]=React.useState("")
    

    const handleFirstNameChange = (event)=>{
        setFirstName(event.target.value);
        if(event.target.value.length <= 0){
          setFirstNameErr(true)
        }
        else{
          setFirstNameErr(false)
        } 
     }

     const handleLastNameChange = (event)=>{
        setLastName(event.target.value);
        if(event.target.value.length <= 0){
          setLastNameErr(true)
        }
        else{
          setLastNameErr(false)
        } 
     }
     const handlePhoneChange = (event)=>{
        setPhone(event.target.value);
        if(event.target.value.length <= 0){
          setPhoneErr(true)
        }
        else{
          setPhoneErr(false)
        } 
     }
     const handleSSNChange = (event)=>{
        setSSN(event.target.value);
        if(event.target.value.length <= 0){
          setSSNErr(true)
        }
        else{
          setSSNErr(false)
        } 
     }

     const handleLicenseChange = (event)=>{
        setLicense(event.target.value);
        if(event.target.value.length <= 0){
          setLicenseErr(true)
        }
        else{
          setLicenseErr(false)
        } 
     }

     const handleExpirationDateChange = (event)=>{
        setExpirationDate(event.target.value);
        if(event.target.value.length <= 0){
          setExpirationDateErr(true)
        }
        else{
          setExpirationDateErr(false)
        } 
     }

     const handleExpChange = (event)=>{
        setExperience(event.target.value);
        var regExp = /[a-zA-Z]/g;
        if(event.target.value<=0 || regExp.test(event.target.value)){
          setExperienceErr(true)
        }
        else{
          setExperienceErr(false) 
        } 
     }

     const handleConfirm =() =>{
        /*storeId, fn, ln, phone,ssn,license,experience, expiration*/
       if(firstNameErr||phoneErr||ssnErr||licenseErr||experience<=0 ){
         alert("Please check you input!")
         return;
       }
       console.log(props.id,firstName,lastName,phone,ssn,license,experience,expirationDate)
      props.handleConfirm(props.id,firstName,lastName,phone,ssn,license,experience,expirationDate);
    }  
    
    
/*{
    "first_name": "lkaaaaaakl",
    "last_name": "H",
    "phone": "951-8a92-",
    "ssn": "0032-da43",
    "license_id": "se4asd",
    "experience": 2,
    "expiration_date": "01-01-1990",
    "is_free": true
  }*/
    return (
      <div>
        <Dialog open={props.open}>
          <DialogTitle>
              {`Add new item(s) to ${props.name}`} 
          </DialogTitle>
          <DialogContent>
          <Grid>
          <Grid>Frist Name:</Grid>      
          <OutlinedInput
            error={firstNameErr}
            id="outlined-adornment-name"
            value={firstName}
            onChange={handleFirstNameChange}
            inputProps={{
              'aria-label': 'Name',
            }}
          />
          </Grid>
          <Grid>
          <Grid>Last Name:</Grid>      
          <OutlinedInput
            error={lastNameErr}
            id="outlined-adornment-name"
            value={lastName}
            onChange={handleLastNameChange}
            inputProps={{
              'aria-label': 'Name',
            }}
          />
          </Grid>
          <Grid>
          <Grid>Phone:</Grid>    
          <OutlinedInput
            error={phoneErr}
            id="outlined-adornment-weight"
            value={phone}
            onChange={handlePhoneChange}
            inputProps={{
              'aria-label': 'Weight',
            }}
          />
          </Grid>
          <Grid>
          <Grid>SSN:</Grid>    
          <OutlinedInput
            error={ssnErr}
            id="outlined-adornment-weight"
            value={ssn}
            onChange={handleSSNChange}
            inputProps={{
              'aria-label': 'Weight',
            }}
          />
          </Grid>
          <Grid>
          <Grid>Licence:</Grid>    
          <OutlinedInput
            error={licenseErr}
            id="outlined-adornment-weight"
            value={license}
            onChange={handleLicenseChange}
            inputProps={{
              'aria-label': 'Weight',
            }}
          />
          </Grid>
          <Grid>
          <Grid>Expierence:</Grid>
          <OutlinedInput
            error={experienceErr}
            id="outlined-adornment-price"
            value={experience}
            onChange={handleExpChange}
           
          />
          </Grid>
          <Grid>
          <Grid>Expiration Date:</Grid>    
          <OutlinedInput
            error={expirationDateErr}
            id="outlined-adornment-weight"
            value={expirationDate}
            onChange={handleExpirationDateChange}
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
