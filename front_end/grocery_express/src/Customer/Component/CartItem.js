import * as React from "react";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import item1 from '../../Assets/item1.jpg'


export const CartItem = (props) =>
{   return(
          <Grid container spacing={4} justifyContent="space-between" style={{marginTop:"10px", width:"50%", borderWidth:"0.1px", border:"1px solid", borderColor:"gray", borderRadius:"10px"}}>
              <Grid spacing={4}  style={{display :"flex", width:"15%", margin:"10px"}}>
                <Grid><Avatar src={item1}></Avatar></Grid>          
                <Grid style={{marginLeft:"10px"}}>
                   <Grid style={{width:"20px"}}>{props.name}</Grid>
                    <Grid style={{width:"20px"}}>${props.price}</Grid>
               </Grid>
              </Grid>
                <Grid  justifyContent="space-between" alignItems="center" style={{display :"flex", width:"15%"}}>
                <Grid  style={{ borderWidth: "0.1px", border:"1px solid", borderColor: "gray", width: "30px", height : "25px"}}>1</Grid>   
                <Grid><IconButton><AddIcon/></IconButton></Grid>
                <Grid><IconButton><RemoveIcon/></IconButton></Grid>
              </Grid>
         </Grid>
   
    );
}