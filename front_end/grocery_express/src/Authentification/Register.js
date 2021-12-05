import React, { useState, useRef, useEffect, useContext }   from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Switch, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {getStores, addStore} from '../req/Utils'
import {StoreManagePage} from '../Manager/Pages/StoreManagePage'
/*{
  "name": "chuchuz",
  "email": "chuyingl.lll",
  "phone": "951-892-0434",
  "username": "chuyingl@ggg.com",
  "password": "string",
  "address": "california",
  "customer_rating": 5,
  "credits": 1255,
  "is_manager":false
*/
export const Register =(props) =>{
  const[showPsw, setShowPsw] = useState(false);
  const[psw, setPsw] = useState('');
  const[name, setName] = useState(''); 
  const[email,setEmail] = useState('');
  

  const handlePswChange = (event)=>{
      setPsw(event.target.value)
  } 

  const hanldeNameChange =(event) =>{
      setName(event.target.value);
  } 

  const hanldeEmailChange =(event) =>{
    setEmail(event.target.value);
 } 

  const handleShowPsw = () => {
      setShowPsw(!showPsw);
  }
 
  return (
    <div>
       <div>
           <div><AccountCircleIcon style={{fontSize: "50px"}}/></div>
           <div style={{display: "flex", alignItems:"baseline", position:"relative", left:"35%"}}> 
         <InputLabel >User Name</InputLabel>
          <Input
            style={{marginLeft: "2%", width:"242px"}}
            value={name}
            onChange={hanldeNameChange}
          /> </div>
           <div style={{display: "flex", alignItems:"baseline", position:"relative", left:"35%"}}> 
         <InputLabel >Email</InputLabel>
          <Input
            style={{marginLeft: "2%", width:"242px"}}
            value={email}
            onChange={hanldeEmailChange}
          /> </div>
          <div style={{display: "flex", alignItems:"baseline", position:"relative", left:"35%"}}> 
         <InputLabel >First Name</InputLabel>
          <Input
            style={{marginLeft: "2%", width:"242px"}}
            value={email}
            onChange={hanldeEmailChange}
          /> </div>
          <div style={{display: "flex", alignItems:"baseline", position:"relative", left:"35%"}}> 
         <InputLabel >First Name</InputLabel>
          <Input
            style={{marginLeft: "2%", width:"242px"}}
            value={email}
            onChange={hanldeEmailChange}
          /> </div>
           <div style={{display: "flex", alignItems:"baseline", marginTop:"20px", position:"relative", left:"36%"}}> 
          <InputLabel >Password</InputLabel>
          <Input
            style={{marginLeft: "2%"}}
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
           <div style={{marginTop : "30px"}}> <Button variant="contained">Register</Button></div>
           <div style={{marginTop : "30px"}}> <a href={'/'}>Have an account already? Log in</a></div>
       </div>    
    </div>    
  );
}
