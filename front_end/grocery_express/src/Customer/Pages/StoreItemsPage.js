import React, { useState, useRef, useEffect, useContext }   from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {getStores, addStore} from '../../req/Utils'
import {CustomerToolBar} from "../Component/CustomerToolBar"
import {StoreCard} from "../Component/StoreCard"
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { CartItem } from '../Component/CartItem';
import { useParams, useNavigate } from 'react-router-dom';


export const StoreItemsPage = (props) =>{
    const [items, setItems] = useState([]);
    const isMounted = useRef(false);
    let params = useParams();
    let storeName = params.storeName;
    useEffect(() => {
      isMounted.current = true;
      initStores();
      return () => {
        isMounted.current =false;
      }
    }, []) // before the pafed loaded, get data from the server
  
   const initStores =() => {
       console.log('get data')
       if(isMounted.current){
         let items =[
            {
                id: "a23fwItem",
                name: "iphone",
                unit_price: 1980.05,
                weight: 2.21,
                
            },
            {
                id: "a23fwIte1",
                name: "apple",
                unit_price: 2,
                weight: 1.0,
                
            }
         ]
         setItems(items);
       }
    }
    return(
     <div>
         <CustomerToolBar/>
          <Grid><h1>{storeName}</h1></Grid>
          <Grid style={{position:"relative", left:"30%", height: "70%"}}justifyContent="center">
          {items && 
             items.map((item,index)=>{   
             return(  
              <CartItem key ={index} name={item.name} price={item.unit_price}/>
             )  
          })
          }
       </Grid>
     </div>
    );
}