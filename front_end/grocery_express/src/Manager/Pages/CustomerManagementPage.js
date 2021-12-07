import React,{useRef,  useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { StoreContext } from '../../StoreContext';
import { getCustomers } from '../../req/Utils';
import { popoverClasses } from '@mui/material';
import { getThemeProps } from '@mui/system';
import congrat from '../../Assets/status.jpg'
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import Rating from '@mui/material/Rating';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { CustomerItem } from '../Component/CustomerItem';

export  function CustomerManagementPage(props) {
    const isMounted =useRef(false);
    const session = localStorage.getItem('token')
    const [customers,setCustomers] = useState([])
    
    useEffect(() => {
      isMounted.current =true;
        getCustomerData();
        return () => {
          isMounted.current =false
        }
    }, []) 

    const getCustomerData =() =>{
       getCustomers(session).then(
         (res)=>{
          setCustomers(res);
         }
       ).catch(
         (err)=>{
           alert('Fail to get customer data')
         }
       )
    }

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent:"center",
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Paper elevation={3} > 
         {customers&&
           customers.map((customer,index)=>{
             if(!customer.is_manager){
             return(
             <CustomerItem index={index} {...customer}/>
             )
             }
           })
         }
        </Paper>  
      </Box>
    );
  }
  /*"accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYWxsYSIsImlhdCI6MTYzODY4OTYyNCwiZXhwIjoxNjM5Mjk0NDI0fQ.IXU88D5uV0ZBHaTRyJah6ZXIiVoTeVndNx87MzBeh8--WPN6k-KZvBgUsfoVBibLE5KV7B5Bikwzw93ZNODPRA",
    "tokenType": "Bearer",
    "user_id": 6,
    "name": "lalal",
    "username": "l cy",
    "email": "lalla",
    "phone": "5315242",
    "address": "cali",
    "customer_rating": "1000",
    "credits": 1000.0,
    "is_manager": false*/