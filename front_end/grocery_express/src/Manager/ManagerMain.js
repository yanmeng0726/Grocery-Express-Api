import * as React from 'react';
import { Outlet } from 'react-router';
import { ManagerToolBar } from './Component/ManagerToolBar';


export const ManagerMain = (props) => {
  return (
    <div>
      <div>
        <ManagerToolBar/>
        <Outlet/>
      </div>
    </div>
  );
}

