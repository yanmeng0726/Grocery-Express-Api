import * as React from "react";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import drone from '../../Assets/drone.jpg'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import {Box} from '@mui/material'


/*"id": 8,
        "name": "sdfs",
        "username": null,
        "email": null,
        "phone": "1234",
        "address": "August lu",
        "customer_rating": "1000",
        "credits": 5.0,
        "is_manager": false*/
export const CustomerItem = (props) =>

{   
    return(
         <Box boxShadow={3} style={{width:"100%", padding:"30px", }}>
          <Grid container spacing={4} justifyContent="space-between" style={{marginTop:"10px", width:"100%", paddingRight:"10px"}}>
              <Grid spacing={4} alignItems="center"  style={{display :"flex", width:"15%", margin:"10px"}}>
                <Grid><Avatar></Avatar></Grid>          
                <Grid style={{marginLeft:"10px"}}>
                   <Grid style={{width:"20px"}}>{props.name}</Grid>
               </Grid>
              </Grid>
                <Grid  alignItems="center" style={{display :"flex", width:"80%"}}>
                <Grid style={{display :"flex", width:"15%",marginLeft:"10px"}}>{`   Phone:  ${props.phone}`}</Grid>
                <Grid style={{display :"flex", width:"15%",marginLeft:"10px"}} >{`   Address:  ${props.address}`}</Grid>
                <Grid style={{display :"flex", width:"15%",marginLeft:"10px"}} >{`   Rating:  ${props.customer_rating}`}</Grid>
                <Grid style={{display :"flex",width:"15%", marginLeft:"10px"}} >{`   Credits:  ${props.credits}`}</Grid>

              </Grid>
         </Grid>
         </Box>
   
    );
}