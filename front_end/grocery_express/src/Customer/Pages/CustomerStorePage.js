import React, { useState, useRef, useEffect, useContext }   from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {getStores, addStore} from '../../req/Utils'
import {CustomerToolBar} from "../Component/CustomerToolBar"
import {StoreCard} from "../Component/StoreCard"
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { stepConnectorClasses } from '@mui/material';



export const CustomerStorePage = (porps) =>{
    const [stores, setStores] = useState(null);
    const [newStoreDlgOpen, setNewStroeDlgOpen] = useState(false); 
    const isMounted = useRef(false);
    
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
         getStores().then((res)=>{
           let stores = [];
           if(res){
            console.log(stores)
             const keys = Object.keys(res)
             console.log(keys);
             for ( let i = 0; i<keys.length ; i++){
                let store = res[keys[i]];
                let storeItem = 
                {
                   id : store.id,
                   name : store.name,
                   revenue  : store.revenue,
                   expend : false,
                   itemList: []
                } 
                stores[store.id]=storeItem;
            }
            setStores(stores);
           }
          }
         ).catch(function(rej) {
            //here when you reject the promise
            alert(rej)
          })
       }
    }


    const openNewStoreDlg =() =>{
       setNewStroeDlgOpen(true); 
    }

    const closeNewStoreDlg =() =>{
       setNewStroeDlgOpen(false); 
    }

    return(
     <div>
         <CustomerToolBar/>
          <Grid container spacing={4} style={{width:"80%", margin:"10%", marginTop:"10px"}}>
          {
          stores && 
            Object.keys(stores).map((key,index)=>{
             const store = stores[key]    
             return(
              <Grid index = {index} item xs={10} sm={6} md={6}>       
             <StoreCard name={store.name} index ={index}/>
              </Grid>
             )  
          })
          }
         </Grid>
     </div>
    );
}