import React, { useState, useRef, useEffect, useContext }   from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {getStores, addStore} from '../req/Utils'
import {StoreManagePage} from '../Manager/Pages/StoreManagePage'
import {CustomerToolBar} from '../Customer/Component/CustomerToolBar'
import {CustomerStorePage} from '../Customer/Pages/CustomerStorePage'
import { CartItem } from '../Customer/Component/CartItem';
import { StoreItemsPage } from '../Customer/Pages/StoreItemsPage';
export const ChuyingWorkSpace =(props) =>{
  
  return (
    <div>
        <StoreManagePage/>
    </div>    
  );
}

