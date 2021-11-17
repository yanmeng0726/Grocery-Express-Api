import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ManagerMain } from './Manager/ManagerMain'
import { ChuyingWorkSpace } from './ChuyingWS/ChuyingWorkSpace'
import { HuangqiWorkSpace } from './HuangqiWS/HuangqiWorkSpace'

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="Manager" element={<ManagerMain/>} />
      <Route path="Chuying" element={<ChuyingWorkSpace/>} />
      <Route path ="Huangqi" element={<HuangqiWorkSpace/>} />      
    </Route>
  </Routes>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
