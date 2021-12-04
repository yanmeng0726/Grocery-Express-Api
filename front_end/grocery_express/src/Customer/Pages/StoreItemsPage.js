import React, { useState, useRef, useEffect, useContext }   from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {CustomerToolBar} from "../Component/CustomerToolBar"
import {StoreCard} from "../Component/StoreCard"
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { CartItem } from '../Component/CartItem';
import { getItemsofStore } from '../../req/Utils';
import { StoreContext } from '../../StoreContext';



export const StoreItemsPage = (props) =>{
    const store = useContext(StoreContext);
    const [items, setItems] = useState(null);
    const isMounted = useRef(false);
    useEffect(() => {
      isMounted.current = true;
      loadItems();
      return () => {
        isMounted.current =false;
      }
    }, []) // before the pafed loaded, get data from the server
  
   const loadItems =() => {
       getItemsofStore(props.storeId, store.session).then(
         (res)=>{
           console.log(res)
           var newItems = {}
           res.map((item)=>{
              console.log(item)
              newItems[item.id] = item
           })
           setItems(newItems)
         }
       ).catch(
        function(rej) {
          //here when you reject the promise
          alert(rej)
        }
       )
    }
    return(
     <div>
          <Grid><h1>{props.storeName}</h1></Grid>
          <Grid style={{position:"relative", left:"20%", height: "70%"}}justifyContent="center">
          {items && 
             Object.keys(items).map((key,index)=>{
             var item = items[key];   
             return(  
              <CartItem key ={index} id={item.id} storeId ={props.storeId} name={item.name} price={item.unit_price} weight={item.weight}/>
             )  
          })
          }
       </Grid>
     </div>
    );
}