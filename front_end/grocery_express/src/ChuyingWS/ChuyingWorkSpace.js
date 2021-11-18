import * as React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {getStores} from '../req/Utils'

export const ChuyingWorkSpace =(props) =>{
  
  const testGet = (event) =>
  {
      getStores();
  }     
  
  return (
    <div>
       <Button onClick ={testGet}>Test</Button>
    </div>    
  );
}

