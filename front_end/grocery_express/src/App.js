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
import {StoreItemsPage} from './Customer/Pages/StoreItemsPage'
import {StoreContextProvider, initData} from './StoreContext'
import * as Crypto from 'crypto-js'

function App() {
  const [value, setValue] = React.useState(window.location.pathname);
  const [loggedin, setloggedin] = React.useState(false);
  const [store, setStore] =React.useState({
    ...initData
  })

  const contextStore= {store, setStore};

  /*setStoreData: (data)=>{
    const newstore = {
      ...store,
      ...data,
    };
    setStore(
      newstore
    );
    console.log('add new store', store)
    setloggedin(!!(newstore.user && newstore.user.name));
  },*/
  


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


  const handleLogin = (loggedin, userData, session) =>{
    console.log(loggedin, userData, session)
    if(loggedin){
      var newstore = {
        user: userData,
        session: session
      }
      localStorage.setItem('user', encryptInfo(userData,session));
    }
    setStore(newstore);
    setloggedin(loggedin)
  }

  const encryptInfo = (userData, session)=>{
    return Crypto.AES.encrypt(JSON.stringify(userData), session).toString();
  }

  const decryptInfo = (encodedString, session)=>{
    var bytes = Crypto.AES.decrypt(encodedString, session)
    var decryptedData =JSON.parse(bytes.toString(Crypto.enc.Utf8));
    return decryptedData;
  }

 
  return (
    <div className="App">
    <StoreContextProvider value={contextStore}>  
    <BrowserRouter>
     <Routes>
      {!loggedin &&<Route path = "Login" element={<Login loggedin={true} handleLogin={handleLogin}/>}></Route>}
      {!loggedin &&<Route path = "Register" element={<Register/>} />}
      {!loggedin &&<Route path = "*" element={ <Navigate to='Login' /> } />}
      {loggedin && <Route path="Manager" element={<ManagerMain/>}/>}
      {loggedin &&<Route path="Chuying" element={<ChuyingWorkSpace/>} />}
      {loggedin &&<Route path="Chuying/:storeName" element={<StoreItemsPage/>} />}
      {loggedin &&<Route path ="Huangqi" element={<HuangqiWorkSpace/>} />}  
      {loggedin &&<Route path ="*" element={<Navigate to='Chuying' />}  />}
    </Routes>
    </BrowserRouter>
    </StoreContextProvider> 
    </div>
  );
}

export default App;

