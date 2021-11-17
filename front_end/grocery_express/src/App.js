import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ChuyingWorkSpace from './ChuyingWS/ChuyingWorkSpace'
import HuangqiWorkSpace from './HuangqiWS/HuangqiWorkSpace'
import ManagerMain from './Manager/ManagerMain'



function App() {
  const [value, setValue] = React.useState(window.location.pathname);
  
  const routes = ['/Manager', '/Chuying', '/Huangqi']

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };
  return (
    <div className="App">
       <div>
      <h1>Grocery Express</h1>
      <Tabs value={value} onChange ={handleChange} >
      <Tab value={routes[0]}
                  label="Manager"
                  component={Link}
                  to={routes[0]}/>
      <Tab value={routes[1]}
                  label="Chuying"
                  component={Link}
                  to={routes[1]}
                /> 
      <Tab value={routes[2]}
                  label="Huangqi"
                  component={Link}
                  to={routes[2]}/>
    </Tabs>
    </div>
    <Outlet/>  
    </div>
  );
}

export default App;

