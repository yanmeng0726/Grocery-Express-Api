import React, { useState}   from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Divider, Paper } from '@mui/material';
import { register } from '../req/Utils';

export const Register =(props) =>{
  const[showPsw, setShowPsw] = useState(false);
  const[psw, setPsw] = useState('');
  const[name, setName] = useState(''); 
  const[email,setEmail] = useState('');
  const[phone, setPhone] =useState('');
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[address, setAddress] = useState('');

  const handlePswChange = (event)=>{
      setPsw(event.target.value)
  } 

  const handleNameChange =(event) =>{
      setName(event.target.value);
  } 

  const handleEmailChange =(event) =>{
    setEmail(event.target.value);
  }
  
  const handleFirstNameChange =(event) =>{
    setFirstName(event.target.value);
 } 
 const handleLastNameChange =(event) =>{
  setLastName(event.target.value);
} 

const handleAddressChange =(event) =>{
  setAddress(event.target.value);
} 

const handlePhoneChange =(event) =>{
  setPhone(event.target.value);
}

const handleShowPsw = () => {
      setShowPsw(!showPsw);
  }

 /* name, email,phone,firstName, lastName, psw, addr, rating, credits, isManager, token*/
const handleRegister = () =>{
  register(name, email, phone, firstName, lastName, psw, address, 1000, 5,false).then(
    (res)=>{alert('you successfully created a new user!')}
  )
  .catch(
   (res)=>{alert(`Fail to creat a new user: ${res}`)}
  )
}
 
  return (
    <div>
       <Paper elevation={3} style={{width:"50%",height:"80%", position:"relative", left:"20%", marginTop:"10%"}}>
      
           <div><AccountCircleIcon style={{fontSize: "50px" , marginTop:"20px", color:"grey"}}/></div>
           
           <div style={{ alignItems:"baseline", position:"relative", marginTop:"30px"}}> 
         <div>User Name:</div>
          <Input
            style={{ width:"260px"}}
            value={name}
            onChange={handleNameChange}
          /> </div>
          <div style={{ alignItems:"baseline", position:"relative", marginTop:"30px"}}> 
         <div>Phone:</div>
          <Input
            style={{ width:"260px"}}
            value={phone}
            onChange={handlePhoneChange}
          /> </div>
           <div style={{ alignItems:"baseline", position:"relative",  marginTop:"15px"}}> 
         <div>Email: </div>
          <Input
            style={{width:"260px"}}
            value={email}
            onChange={handleEmailChange}
          /> </div>
          <div style={{ alignItems:"baseline", position:"relative", marginTop:"15px"}}> 
         <div>First Name:</div>
          <Input
            style={{ width:"260px"}}
            value={firstName}
            onChange={handleFirstNameChange}
          /> </div>
          <div style={{ alignItems:"baseline", position:"relative", marginTop:"15px"}}> 
         <div >Last Name:</div>
          <Input
            style={{width:"260px"}}
            value={lastName}
            onChange={handleLastNameChange}
          /> </div>
          <div style={{ alignItems:"baseline", position:"relative", marginTop:"15px"}}> 
         <div>Address:</div>
          <Input
            style={{width:"260px"}}
            value={address}
            onChange={handleAddressChange}
          /> </div>
           <div style={{ alignItems:"baseline", position:"relative", marginTop:"15px"}}> 
          <div>Password:</div>
          <Input
            style={{width:"260px"}}
            id="standard-adornment-password"
            type={showPsw ? 'text' : 'password'}
            value={psw}
            onChange={handlePswChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPsw}
                >
                  { showPsw ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          /> </div>
           <div style={{marginTop : "30px"}}> <Button variant="contained" onClick={handleRegister}>Register</Button></div>
           <div style={{marginTop : "30px"}}> <a href={'/'}>Have an account already? Log in</a></div>
           <Divider style={{marginTop :"30px"}}/>
       </Paper>  
    </div>    
  );
}
