import React, { useState, useRef, useEffect, useContext }   from 'react';

import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import { StoreContext } from '../../StoreContext';

import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

import { getUserOrders,cancelOrder } from '../../req/Utils';
import {StatusItem} from '../Component/StatusItem';


export  function OrderStatusPage(props) {
    const context = useContext(StoreContext)
    const userId = context.store.user.user_id;
    const session= context.store.session;
    const isMounted = useRef(false)
    const [status,setStatus]= useState({});
    
    useEffect(() => {
        isMounted.current = true;
        initStatus();
        return () => {
          isMounted.current =false;
         
        }
      }, [])
    
    /*drone_id: null
      employee_id: null
      id: 16
      lines: []
      order_status: 1
      store_id: 1
      total_cost: 100.27
      total_weight: 30.26
      user_id: 5*/
    const initStatus =() =>{
      if(isMounted.current){
        console.log("get orders", userId, session);
        getUserOrders(userId,session).then(
          (res)=> {
            var newStatus={};
            res.map((status)=>{
              newStatus[status.id] = status  
            })
            setStatus(newStatus)       
        }
        ).catch
        (
          (err)=>alert(`Ooops! Failed to load orders:${err}`) 
        )

      }
    }

    const handleCancel = (storeId, orderId) =>{
        cancelOrder(storeId, orderId, session).then(
            (res)=>{console.log(res)
            delete(status.orderId)
            setStatus(status)
            }
        ).catch(
         (err)=>{alert(`Fail to cancel: ${err}`)}
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
            width: 1000,
          },
        }}
      >
        <Paper elevation={3} > 
          <Grid><Grid><h3 style={{color:"grey"}}>Tracking Orders</h3></Grid></Grid>
          <Divider/>
          {status.length===0? <Grid>You don't have any order yet</Grid>
          :
          <Grid container
                direction="row"
            justifyContent="space-around"
            alignItems="center" style={{display:"flex", width:"100%"}}>
              <Grid style={{color:"grey"}}><h4>Id</h4></Grid>
              <Grid style={{color:"grey"}}><h4>Status</h4></Grid>
              <Grid style={{color:"grey"}}><h4>Total Cost</h4></Grid>
              {
                  Object.keys(status).map((key, index)=>{
                      var statusItem = status[key] 
                      return(<StatusItem handleCancel={handleCancel} index={index} id={statusItem.id} status={statusItem.order_status} storeId={statusItem.store_id} totalCost={statusItem.total_cost} />)
                  })
              }
           </Grid>
          }
          <Divider/>
        </Paper>  
      </Box>
    );
  }
  