import * as React from 'react';
import { Outlet } from 'react-router';
import { CustomerToolBar } from './Component/CustomerToolBar';

export const CustomerMain = (props) => {
  return (
    <div>
      <div>
        <CustomerToolBar handleLogout={props.handleLogout}/>
         <Outlet/>
      </div>
    </div>
  );
}

