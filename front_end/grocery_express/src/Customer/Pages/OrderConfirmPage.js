import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {decryptInfo} from '../../App'
import { addLinesToOrder, cancelOrder  } from '../../req/Utils';

export  function OrderConfirmPage(props) {
  const token = localStorage.getItem('token')
    const orderString = localStorage.getItem('order')
    var orderObj =decryptInfo(orderString, token);
    const handlePlaceOrder = () =>{
      //get stored order info
      const token = localStorage.getItem('token')
      const orderString = localStorage.getItem('order')
      var orderObj =decryptInfo(orderString, token);
      var newItems = [];
      orderObj.items.map((item) => {
        item.id = orderObj.oderId
        newItems.push(item)
      })
      console.log(newItems)
      addLinesToOrder(orderObj.storeId, orderObj.oderId, newItems,token ).then(
        (res)=>{
          console.log(res)
          alert('Successifuly added items to your order')
          props.addedItemCallback();

        }
      ).catch(
        (err)=>{
          alert(err)
          props.resetOrder()
        }
      )
    }
    const handleCancel = () =>{
      cancelOrder(orderObj.storeId, orderObj.oderId, token).then(
          (res)=>{
          alert('you successfully cancel this order!')
          props.resetOrder()
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
            width: 500,
            height: 500,
          },
        }}
      >
        <Paper elevation={3} > 
          <Grid><Grid><StarIcon style={{color:"gold", fontSize:"70px"}}/></Grid><h2 style={{color:"grey"}}>{'You created a new order!'}</h2></Grid>
          <Divider/>
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid><h4>order id:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}>{props.order.id}</Grid>
          </Grid>  
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid><h4>total cost:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}>{props.order.total_cost}</Grid>
          </Grid>
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid><h4>total weight:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}>{props.order.total_weight}</Grid>
          </Grid>
          <Grid alignItems="center" justifyContent="center" spacing={4} style={{display: "flex", width : "100%"}}>
              <Grid><h4>status:</h4></Grid>
              <Grid style={{marginLeft:"15px"}}>pending</Grid>
          </Grid>
          <Divider/>
          <Button onClick={handlePlaceOrder} style={{marginTop:"15px"}} variant= "contained">Place Order</Button> 
          <Button onClick={handleCancel}style={{marginTop:"15px", marginLeft: "15px"}} variant= "contained">Cancel Order</Button> 
        </Paper>  
      </Box>
    );
  }
  