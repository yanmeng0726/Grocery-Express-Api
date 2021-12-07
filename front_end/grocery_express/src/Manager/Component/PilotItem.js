/*{
    "first_name": "lkaaaaaakl",
    "last_name": "H",
    "phone": "951-8a92-",
    "ssn": "0032-da43",
    "license_id": "se4asd",
    "experience": 2,
    "expiration_date": "01-01-1990",
    "is_free": true
  }*/
  import * as React from "react";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import pilot from '../../Assets/pilot.jpg'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
 const pilotStatus ={
   "0": "free",
   "1": "In Task",
 }
  export const AddedPilotItem = (props) =>

{   return(
          <Grid container spacing={4} justifyContent="space-between" style={{marginTop:"10px", width:"100%", borderWidth:"0.1px", border:"1px solid", borderColor:"gray", borderRadius:"10px",paddingRight:"10px"}}>
              <Grid spacing={4} alignItems="center"  style={{display :"flex", width:"15%", margin:"10px"}}>
                <Grid><Avatar src={pilot}></Avatar></Grid>          
                <Grid style={{marginLeft:"10px"}}>
                   <Grid style={{width:"20px"}}>{props.first_name}</Grid>
                   <Grid style={{width:"20px"}}>{props.last_name}</Grid>
               </Grid>
              </Grid>
                <Grid   alignItems="center" style={{display :"flex", width:"70%"}}>
                <Grid style={{display :"flex"}}>{`Phone:  ${props.phone}`}</Grid>
                <Grid style={{display :"flex", marginLeft:"10px"}}>{`SSN:  ${props.ssn}`}</Grid>
                <Grid style={{display :"flex", marginLeft:"10px"}} >{`Licence:  ${props.license_id}`}</Grid>
                <Grid style={{display :"flex", marginLeft:"10px"}} >{`Licence Expiration:  ${props.expiration_date}`}</Grid>
                <Grid style={{display :"flex", marginLeft:"10px"}} >{`Experience:  ${props.experience}`}</Grid>
                <Grid style={{display :"flex", marginLeft:"10px"}} >{`Status:  ${props.is_free? "free": "In a task"}`}</Grid> 
              </Grid>
         </Grid>
   
    );
}