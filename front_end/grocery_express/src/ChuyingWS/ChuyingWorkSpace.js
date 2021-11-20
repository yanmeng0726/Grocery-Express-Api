import React, { useState, useRef, useEffect, useContext }   from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {getStores} from '../req/Utils'
import {StoreManagePage} from '../Manager/Pages/StoreManagePage'

export const ChuyingWorkSpace =(props) =>{
 
  
  return (
    <div>
       <StoreManagePage/>
    </div>    
  );
}

