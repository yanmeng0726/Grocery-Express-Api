import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { StoreContext } from '../../StoreContext';
import { getMaxLoadDrone, startaNewOrder } from '../../req/Utils';
import { popoverClasses } from '@mui/material';
import { getThemeProps } from '@mui/system';
import congrat from '../../Assets/status.jpg'
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
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
  