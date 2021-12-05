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
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import  Button from '@mui/material/Button';
import {getStores} from './req/Utils'

function App() {
  const [value, setValue] = React.useState(window.location.pathname);
  const [loggedin, setloggedin] = React.useState(false);
  const [store, setStore] =React.useState({
    ...initData
  })
  const [testData, setTestData] = React.useState([]);
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
  
  const initStores =() => {
    console.log('get data')
      /*var session =""
      if(store.session){
         session = store.session;
      }*/
      // add auth token here 
      var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaHV5aW5nbEBnbWFpbC5jb20iLCJpYXQiOjE2Mzg2NjI3MjcsImV4cCI6MTYzOTI2NzUyN30.lhY2Lq0AHLgAdBeIQk04Nsw5ldYOKX6msg-R8bBDC7RqqqkTUUl-NhLjSUOGO7TuxHAasTzKbkJF9zEz1DdJJA"
      getStores(token).then((res)=>{
        let stores = [];
        if(res){
          console.log(res);
          setTestData(res)
        }
       }
      ).catch(function(rej) {
         //here when you reject the promise
         alert(rej)
       })
  }
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
    window.location.href='/Chuying'
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
    <div>
    <Button variant="contained" onClick={()=>{initStores()}}>Test</Button>
    {
      testData.map((data)=>{
        { console.log(data)
        return(<div>{data.name}</div>)}
      })
    }
    </div>
  );
 
  /*return (
    <div className="App">
    <StoreContextProvider value={contextStore}>  
    <BrowserRouter>
     <Routes>
      {<Route path = "Login" element={<Login loggedin={true} handleLogin={handleLogin}/>}></Route>}
      {<Route path = "Register" element={<Register/>} />}
      {<Route path="Manager" element={<ManagerMain/>}/>}
      {<Route path="Chuying" element={<Register/>} />}
      {<Route path="Chuying/:storeName" element={<StoreItemsPage/>} />}
      {<Route path ="Huangqi" element={<HuangqiWorkSpace/>} />}  
      {<Route path ="*" element={<Navigate to='Chuying' />}  />}
    </Routes>
    </BrowserRouter>
    </StoreContextProvider> 
    </div>
  );*/
}

export default App;

