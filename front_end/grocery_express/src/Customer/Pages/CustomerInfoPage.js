import React,{useRef, useContext, useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import { StoreContext } from '../../StoreContext';

import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import Rating from '@mui/material/Rating';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export  function CustomerInfoPage(props) {
    const isMounted =useRef(false);
    const context = useContext(StoreContext);
    const [user,setUser] = useState({})
    
    useEffect(() => {
        getUserData();
        return () => {
        }
    }, []) 

    const getUserData =() =>{
       var user = context.store.user
       setUser(user);
    }
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent:"center",
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 500,
            height: 500,
          },
        }}
      >
        <Paper elevation={3} > 
          <Grid style={{marginTop:"20px"}}>
              <Grid><PersonOutlineIcon style={{fontSize:"40px", color:"grey"}}/></Grid>
              <h2 style={{color:"grey"}}>{'Customer Account'}</h2>
            </Grid>
          <Divider/>
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid style={{color:"grey"}}><h4>User Name:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}>{user.username}</Grid>
          </Grid>  
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid style={{color:"grey"}}><h4>Address:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}>{user.address}</Grid>
          </Grid>  
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid style={{color:"grey"}}><h4>phone:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}>{user.phone}</Grid>
          </Grid>  
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid style={{color:"grey"}}><h4>Remain Credits:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}>{user.credits}</Grid>
          </Grid>
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid style={{color:"grey"}}><h4>Rating::</h4></Grid>
              <Grid style={{marginLeft:"15px"}}> <Rating name="read-only" value={5} readOnly /></Grid>
          </Grid>
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