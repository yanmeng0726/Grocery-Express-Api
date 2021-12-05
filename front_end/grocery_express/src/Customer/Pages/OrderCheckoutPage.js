import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { StoreContext } from '../../StoreContext';
import { getMaxLoadDrone, startaNewOrder } from '../../req/Utils';
import { popoverClasses } from '@mui/material';
import { getThemeProps } from '@mui/system';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}


function weightRow(qty, unit) {
    return qty * unit;
  }

function createRow(desc, qty, unit, weight) {
  const price = priceRow(qty, unit);
  const weightSum =weightRow(qty,weight)
  return { desc, qty, unit, price, weightSum };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function subWeights  (items) {
    var totalW = items.map(({ weightSum }) => weightSum).reduce((sum, i) => sum + i, 0);
    console.log('ws', totalW)
    return totalW
}
  


export function OrderCheckoutPage(props) {
  const [rows, setRows]= React.useState([])
  const [totalPrice, setTotalPrice] =React.useState(0.0)
  const [totalWeight, setTotalWeight] = React.useState(0.0)
  const [maxWeight ,setMaxWeight] = React.useState(0.0)
  const context = React.useContext(StoreContext)
  React.useEffect(()=>{
    if(context.store.pendingOrders){
       console.log("CheckOutItems", context.store.pendingOrders)
       var items = context.store.pendingOrders.items
       var storeId = context.store.pendingOrders.storeId
       var session =context.store.session
       if(Object.keys(items).length>0){
        console.log(items)
        var rows = []
        Object.keys(items).map((key)=>{
            var item = items[key]
            rows.push(createRow(item.name, item.quantity, item.price, item.weight))    
        })
        console.log("store", storeId)
        getMaxWeightDrone(storeId,session);
        setRows(rows);
        setTotalPrice(subtotal(rows));
        setTotalWeight(subWeights(rows));
       }
    }
  },[])

  const getMaxWeightDrone= (storeId, session) =>{
    getMaxLoadDrone(storeId, session).then(
        (res)=>{
           setMaxWeight(res)

        }
    ).catch(
        ()=>{
          alert("Oops! Fail to get available drones!")
        }
    ) 
  }

  const handleCheckoutItem =() =>{
    const userCredits = context.store.user.credits;
    console.log(userCredits)
    if(userCredits < totalPrice){
        alert("Your current credits are not enogh to pay current balance, Please remove some items from the cart")
        return;
    }
    if(totalWeight>maxWeight){
        alert("The total weights of items is over the max load of drones")
        return;
    }
    var storeId = context.store.pendingOrders.storeId;
    var userId = context.store.user.userId;
    var session =context.store.session
    console.log(context.store)
    startaNewOrder(storeId, totalPrice, totalWeight, userId, session).then((res)=>{
      console.log('start order', res)
      props.checkoutCallback(res)}
    ).catch( 
     (e)=>{alert("There is an unexpected error when start a order, please try later.Thanks!")})
  }
  return (
      <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell align="right"><b>Qty.</b></TableCell>
            <TableCell align="right"><b>Unit</b></TableCell>
            <TableCell align="right"><b>Sum</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}><b>Total</b></TableCell>
            <TableCell align="right"><b>{ccyFormat(totalPrice)}</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Button onClick={handleCheckoutItem} variant= "contained" style={{position:"relative", left:"40%", marginTop:"10px"}}>Check out</Button>
    </div>
  );
}
