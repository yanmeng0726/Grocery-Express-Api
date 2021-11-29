import React, { useState, useRef, useEffect, useContext }   from 'react';
import Button from '@mui/material/Button';

export const UserPage = (props) =>{
   const[times , setTimes] =  useState(0)
   const handleChange= ()=>{
       console.log('lalala!');
       setTimes(times+1);
   } 
   return (
        <div>
           <div style= {{color: "red"}}>Test</div>
            <div>{times}</div>
           <Button variant="contained" onClick={handleChange}>Add User</Button>
        </div>    
    );
}