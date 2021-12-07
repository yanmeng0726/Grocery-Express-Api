import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TimeLine } from '../../SharedComponents/TImeLine';


//0-cancel 1-pending 2-shipping 3-delivered
export  function StatusItem (props) {
    return (
          <Box container
                component={Grid}
                boxShadow={1}
                direction="row"
            justifyContent="space-around"
            alignItems="center" style={{display:"flex", width:"100%", marginBottom:"10px"}}>
              <Grid/>
              <Grid style={{color:"grey"}}>{props.id}</Grid>
              <Grid style={{color:"grey"}}><TimeLine status={props.status}/></Grid>
              <Grid style={{color:"grey"}}>{props.totalCost}</Grid>
              <Grid>{ props.status<2&&<Button onClick={()=>{props.handleCancel(props.storeId, props.id)}}>Cancel Order</Button>}</Grid>
           </Box>
          
    );
  }
  