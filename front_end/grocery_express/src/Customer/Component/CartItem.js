import * as React from "react";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import item1 from '../../Assets/item1.jpg'
import { StoreContext } from "../../StoreContext";


export const CartItem = (props) =>
{   
    const context = React.useContext(StoreContext);
    const [quantity, setQuantity] = React.useState(0);
    React.useEffect(()=>{
        // check current quantuty in pending orders
        console.log('Im here')
        if(context.store.pendingOrders && context.store.pendingOrders.storeId === props.storeId){
            console.log(context.store.pendingOrders)
            var pendingOrders= context.store.pendingOrders
            if(pendingOrders.items && Object.keys(pendingOrders.items).length>0){
                var addeditem =pendingOrders.items[props.id]
                var curQuant = addeditem.quantity;
                console.log("added", curQuant)
                setQuantity(curQuant);
            }
        }
    })

    const updateQunantityInStore = (quantity) =>{    
        if(context.store.pendingOrders || context.store.pendingOrders.storeId === props.storeId){
            console.log(context.store.pendingOrders)
            var pendingOrders= context.store.pendingOrders
            pendingOrders.items[props.id]={
               id:props.id,
               name: props.name,
               quantity: quantity,
               price: props.price,
               weight:props.weight
            }
         context.store.pendingOrders= pendingOrders;
         context.setStore(context.store);
       } 
    }

    const handleAddClick =() =>{
        console.log(quantity)
        var curQuant = quantity+1;
        setQuantity(curQuant);
        updateQunantityInStore(curQuant);
    }

    const handleRemoveClick =() =>{
        console.log(quantity)
        var curQuant = quantity-1;
        setQuantity(curQuant);
        updateQunantityInStore(curQuant);
    }
    return(
          <Grid container spacing={4} justifyContent="space-between" style={{marginTop:"10px", width:"70%", borderWidth:"0.1px", border:"1px solid", borderColor:"gray", borderRadius:"10px"}}>
              <Grid spacing={4}  style={{display :"flex", width:"15%", margin:"10px"}}>
                <Grid><Avatar src={item1}></Avatar></Grid>          
                <Grid style={{marginLeft:"10px"}}>
                   <Grid style={{width:"20px"}}>{props.name}</Grid>
                    <Grid style={{width:"20px"}}>${props.price}</Grid>
               </Grid>
              </Grid>
                <Grid  justifyContent="space-between" alignItems="center" style={{display :"flex", width:"15%"}}>
                <Grid  style={{ borderWidth: "0.1px", border:"1px solid", borderColor: "gray", width: "30px", height : "25px"}}>{quantity}</Grid>   
                <Grid><IconButton onClick={handleAddClick}><AddIcon/></IconButton></Grid>
                <Grid><IconButton onClick={handleRemoveClick}disabled={quantity <=0}><RemoveIcon/></IconButton></Grid>
              </Grid>
         </Grid>
   
    );
}