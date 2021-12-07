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
import {Paper} from '@mui/material'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {getStores, addStore} from '../req/Utils'
import {StoreManagePage} from '../Manager/Pages/StoreItemManagePage'
import {logIn} from '../req/Utils'
import { useNavigate } from 'react-router-dom';

export const Login =(props) =>{
  const[showPsw, setShowPsw] = useState(false);
  const[psw, setPsw] = useState('');
  const[name, setName] = useState(''); 
  let navigate = useNavigate()
  const handlePswChange = (event)=>{
      setPsw(event.target.value)
  } 

  const hanldeNameChange =(event) =>{
      setName(event.target.value);
  } 

  const handleShowPsw = () => {
      setShowPsw(!showPsw);
  }

  const handleLogin =() =>{
    logIn(name,psw).then(
      (res)=>{
        console.log(res) 
          props.handleLogin(true, res)
          if(res.is_manager){
            navigate("/Manager")
          }
          else{
            navigate("/Costomer/MakeOrder")
          }

      }
    ).
    catch(
      (err)=>{
        console.log(err)
        alert(`Fail to login: &{err} `)
      }
    )
  }
 
  return (
 
       <Paper elevation={3} style={{position:"relative", left:"20%", width:"50%", height:"400px", marginTop:"15%"}}>
           <div><AccountCircleIcon style={{fontSize: "50px", marginTop:"20px", color:"grey"}}/></div>
           <div style={{display: "flex", alignItems:"baseline", position:"relative", left:"40%",  marginTop:"20px"}}> 
         <InputLabel >User Name</InputLabel>
          <Input
            style={{marginLeft: "2%", width:"242px"}}
            value={name}
            onChange={hanldeNameChange}
          /> </div>
           <div style={{display: "flex", alignItems:"baseline", marginTop:"20px", position:"relative", left:"41%"}}> 
          <InputLabel >Password</InputLabel>
          <Input
            style={{marginLeft: "1.5%"}}
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
           <div style={{marginTop : "30px"}}> <Button variant="contained" onClick={handleLogin} >Log In</Button></div>
           <div style={{marginTop : "30px", heigh:"20px", marginBottom:"30px"}}> <a href={'/Register'}>Don't have account? Register first</a></div>
           <div></div>
       </Paper>    
  
  );
}
