import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet,Navigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ManagerMain } from './Manager/ManagerMain'
import { ChuyingWorkSpace } from './ChuyingWS/ChuyingWorkSpace'
import { HuangqiWorkSpace } from './HuangqiWS/HuangqiWorkSpace'
import {Login} from '../src/Authentification/Login'
import {Register} from "../src/Authentification/Register"
import { FormControlUnstyled } from '@mui/core';


function App() {
  const [value, setValue] = React.useState(window.location.pathname);
  const [loggedin, setloggedin] = React.useState(false);
  
  const routes = ['/Manager', '/Chuying', '/Huangqi']

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser)
    if (loggedInUser) {
      setloggedin(true);
    }
  }, []);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  const handleLogin = (loggedin) =>{
    console.log(loggedin)
    setloggedin(loggedin)
  }
  return (
    <div className="App">
    <BrowserRouter>
     <Routes>
      {!loggedin &&<Route path = "Login" element={<Login loggedin={true} handleLogin={handleLogin}/>}></Route>}
      {!loggedin &&<Route path = "Register" element={<Register/>} />}
      {!loggedin &&<Route path = "*" element={ <Navigate to='Login' /> } />}
      {loggedin &&<Route path = "*" element={ <Navigate to='Chuying' /> } />}
      {loggedin && <Route path="Manager" element={<ManagerMain/>}/>}
      {loggedin &&<Route path="Chuying" element={<ChuyingWorkSpace/>} />}
      {loggedin &&<Route path ="Huangqi" element={<HuangqiWorkSpace/>} />}      
    </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;

