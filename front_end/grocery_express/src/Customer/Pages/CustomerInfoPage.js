import React,{useRef, useContext, useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import { StoreContext } from '../../StoreContext';

import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import Rating from '@mui/material/Rating';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { config } from '@fortawesome/fontawesome-svg-core';


function CurrencyDropdown(props){
    const curCur = localStorage.getItem('currency')
    const [currency, setCurrency]=useState(curCur? curCur: '$') 
    const handleChange = (event) => {
      setCurrency(event.target.value);
      localStorage.setItem('currency', event.target.value);
    };
    return (
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={currency}
            onChange={handleChange}
            label="Currency"
          >
        
          <MenuItem  key={0} value={'$'}><div>{`USD`}</div></MenuItem> 
          <MenuItem  key={1} value={'¥'}><div>{`RMB`}</div></MenuItem>
          <MenuItem  key={2} value={'€'}><div>{`EUR`}</div></MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  function WeightDropdown(props){
    const [weight, setWeight]=useState('kg') 
    const handleChange = (event) => {
      setWeight(event.target.value);
      localStorage.setItem('weight', event.target.value);
    };
    return (
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Weight Unit</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={weight}
            onChange={handleChange}
            label="Weight Unit"
          >
        
          <MenuItem  key={0} value={'kg'}><div>{`kg`}</div></MenuItem> 
          <MenuItem  key={1} value={'lb'}><div>{`lb`}</div></MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
  

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
            height: 800,
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
              <Grid style={{color:"grey"}}><h4>Rating:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}> <Rating name="read-only" value={5} readOnly /></Grid>
          </Grid>
          <Divider/>
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid style={{color:"grey"}}><h4>Change Currency:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}> <CurrencyDropdown/></Grid>
          </Grid>
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid style={{color:"grey"}}><h4>Change Weight Unit:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}> <WeightDropdown/></Grid>
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