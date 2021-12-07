import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet,Navigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ManagerMain } from './Manager/ManagerMain'
import { CustomerMain} from './Customer/CustomerMain'
import {CustomerOrderPage} from './Customer/Pages/MakeOrderPage'
import {OrderStatusPage} from './Customer/Pages/OrdersStatusPage'
import { CustomerInfoPage } from './Customer/Pages/CustomerInfoPage';
import { StoreManagementPage } from './Manager/Pages/StoreManagementPage';
import { AssignOrderPage } from './Manager/Pages/AssignOrderPage';
import { CustomerManagementPage } from './Manager/Pages/CustomerManagementPage';
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
import {RequireAuth} from './Authentification/RequireAuth'
import { useNavigate } from "react-router-dom";
import { CustomerStorePage } from './Customer/Pages/CustomerStorePage';



function App() {
  const [value, setValue] = React.useState(window.location.pathname);
  const [loggedin, setloggedin] = React.useState(false);
  const [store, setStore] =React.useState({
    ...initData
  })
  const [testData, setTestData] = React.useState([]);
  const contextStore= {store, setStore};

  useEffect(() => {
    console.log(
      'here'
    )
    const loggedInUser = localStorage.getItem("user");
    const token =  localStorage.getItem("token");
    if(loggedInUser && token){
      const userData = decryptInfo(loggedInUser, token);
      if(userData.user_id){
        setloggedin(true);
        var newstore = {
          user: userData,
          session: token,
          loggedin: loggedin
        }
        setStore(newstore)
      }
    }
  }, []);

   
  /*{"accessToken":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaHV5aW5nQGxsbC5jb20iLCJpYXQiOjE2Mzg2Njk4ODksImV4cCI6MTYzOTI3NDY4OX0.ESUWH3Qwf6wcUZgHoFli9fbUbC6mJXNODqRwy4mxrlGRnuDCy6wrAMwSO3mmdb3Ce5hUAJHrO6gwb-TBlCglZA",
  "tokenType":"Bearer","user_id":5,
  "name":"August","username":"August lu",
  "email":"chuying@lll.com","phone":"1234567","address":"cali","customer_rating":"1000","credits":1000.0,"is_manager":false}*/

  const handleLogin = (loggedin, loginRes) =>{
    if(loggedin){
      var session    
      if(loginRes.accessToken){
        session =loginRes.accessToken
      }
      var newstore = {
        user: loginRes,
        session: session,
        loggedin: loggedin
      }
      console.log('here')
      localStorage.setItem('user', encryptInfo(newstore.user,session));
      localStorage.setItem('token', session)
    }
    setStore(newstore);
    console.log("newstore",newstore);
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

  const handleLogout =() =>{
    localStorage.removeItem('user');
    localStorage.removeItem('token')
    setloggedin(false);
  }
  var isManager= false
  if(store.user.is_manager){
    isManager= store.user.is_manager
  }
  console.log(store.user.is_manager)
  return (
    <div className="App">
    <StoreContextProvider value={contextStore}>  
    <BrowserRouter>
     <Routes>
      {<Route path = "/" element={!loggedin? <Login loggedin={loggedin} handleLogin={handleLogin}/> : isManager?<StoreManagementPage/>: <CustomerOrderPage/>}/>}
      {<Route path = "Login" element={<Login loggedin={loggedin} handleLogin={handleLogin}/>}></Route>}
      {<Route path = "Register" element={<Register/>} />}
      {isManager?
        <Route path="Manager" element={<RequireAuth><ManagerMain handleLogout={handleLogout}/></RequireAuth>}>
          <Route path= "StoreManagement" element={<RequireAuth><StoreManagementPage/></RequireAuth>}/>
          <Route path= "Orders" element={<RequireAuth><AssignOrderPage/></RequireAuth>}/>
          <Route path= "Customers" element={<RequireAuth><CustomerManagementPage/></RequireAuth>}/>
        </Route>  
        :
       <Route path="Customer" element={<RequireAuth><CustomerMain handleLogout={handleLogout}/></RequireAuth>}>
         <Route path="*" element={<RequireAuth><CustomerOrderPage/></RequireAuth>}/>
         <Route path="MakeOrder" element={<RequireAuth><CustomerOrderPage/></RequireAuth>}/>
         <Route path= "Status" element={<RequireAuth><OrderStatusPage/></RequireAuth>}/>
         <Route path="Account" element={<RequireAuth><CustomerInfoPage/></RequireAuth>}/>
      </Route>
      }
      {<Route path="Chuying" element={<ChuyingWorkSpace/>}/>}
      {<Route path="Chuying/:storeName" element={<StoreItemsPage/>} />}
      {<Route path ="Huangqi" element={<HuangqiWorkSpace/>} />}
    </Routes>
    </BrowserRouter>
    </StoreContextProvider> 
    </div>
  );
}

export default App;

