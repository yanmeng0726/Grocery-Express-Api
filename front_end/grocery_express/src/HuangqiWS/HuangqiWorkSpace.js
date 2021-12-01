import * as React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {UserPage} from '../HuangqiWS/User_Page'
import {StoreManagePage} from '../Manager/Pages/StoreManagePage'

export const HuangqiWorkSpace = (props)=> {
  return (
    <div>
       <div>Huangqi's Work Space</div>
       <UserPage/> 
       <StoreManagePage/>
    </div>    
  );
}

