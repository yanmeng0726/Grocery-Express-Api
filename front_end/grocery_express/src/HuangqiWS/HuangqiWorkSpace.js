import * as React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {UserPage} from '../HuangqiWS/User_Page'
import {StoreManagePage} from '../Manager/Pages/StoreItemManagePage'

export const HuangqiWorkSpace = (props)=> {
  return (
    <div>
       <div>Huangqi's Work Space Manager customer</div> 
      
      <body>
        <button class="button button1">Store</button>
        <button class="button button2">Orders</button>
        <button class="button button3">Pilot</button>
        <button class="button button4">Drone</button>
        <button class="button button5">Customers</button>
      </body>
    
    <table>
      <thead>
        <tr>
          <th>Customer 1</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Phone:</td>
          <td>xxx-xxxx-xxxx</td>
        </tr>
        <tr>
          <td>Credits:</td>
          <td>xx</td>
        </tr>
        <tr>
          <td>Rating:</td>
          <td>xxx</td>
        </tr>
      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <th>Customer 2</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Phone:</td>
          <td>xxx-xxxx-xxxx</td>
        </tr>
        <tr>
          <td>Credits:</td>
          <td>xx</td>
        </tr>
        <tr>
          <td>Rating:</td>
          <td>xxx</td>
        </tr>
      </tbody>
    </table>





    </div>    
  );

  
}


