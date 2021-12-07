import * as React from "react";
import Grid from '@mui/material/Grid';

import Avatar from '@mui/material/Avatar';
import item1 from '../../Assets/item1.jpg'


export const AddedStoreItem = (props) =>
{   return(
          <Grid container spacing={4} justifyContent="space-between" style={{marginTop:"10px", width:"100%", borderWidth:"0.1px", border:"1px solid", borderColor:"gray", borderRadius:"10px",paddingRight:"10px"}}>
              <Grid spacing={4} alignItems="center"  style={{display :"flex", width:"15%", margin:"10px"}}>
                <Grid><Avatar src={item1}></Avatar></Grid>          
                <Grid style={{marginLeft:"10px"}}>
                   <Grid style={{width:"20px"}}>{props.name}</Grid>
               </Grid>
              </Grid>
                <Grid   alignItems="center" style={{display :"flex", width:"40%"}}>
                <Grid style={{display :"flex", width:"60%"}}>{`Price:  ${props.price}`}</Grid>
                <Grid >{`Weight:  ${props.weight}`}</Grid>
              </Grid>
         </Grid>
   
    );
}