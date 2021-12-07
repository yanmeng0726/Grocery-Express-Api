import * as React from "react";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import drone from '../../Assets/drone.jpg'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

/*"drones":[{"id":1,"weight_limit":50.05,"trips_left":1,"status":1}*/
const droneStatus={
    0: "in matainence",
    1: "in progress",
    2: "available"
}
export const AddedDroneItem = (props) =>

{   return(
          <Grid container spacing={4} justifyContent="space-between" style={{marginTop:"10px", width:"100%", borderWidth:"0.1px", border:"1px solid", borderColor:"gray", borderRadius:"10px",paddingRight:"10px"}}>
              <Grid spacing={4} alignItems="center"  style={{display :"flex", width:"15%", margin:"10px"}}>
                <Grid><Avatar src={drone}></Avatar></Grid>          
                <Grid style={{marginLeft:"10px"}}>
                   <Grid style={{width:"20px"}}>{props.id}</Grid>
               </Grid>
              </Grid>
                <Grid   alignItems="center" style={{display :"flex", width:"70%"}}>
                <Grid style={{display :"flex", width:"40%"}}>{`Status:  ${droneStatus[props.status]}`}</Grid>
                <Grid style={{display :"flex", marginLeft:"10px"}}>{`Weight Limit:  ${props.weight_limit}`}</Grid>
                <Grid style={{display :"flex", marginLeft:"10px"}} >{`Trip Left:  ${props.trips_left}`}</Grid>
                <IconButton><BuildCircleIcon/></IconButton>
              </Grid>
         </Grid>
   
    );
}