import React, { useState, useRef, useEffect, useContext }   from 'react';

import {getStores, addStore} from '../../req/Utils'

import {StoreCard} from "../Component/StoreCard"

import Grid from '@mui/material/Grid';

import { StoreContext } from '../../StoreContext';



export const CustomerStorePage = (props) =>{
    const store = useContext(StoreContext)
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
       console.log('get data', store)
       if(isMounted.current){
         var session =""
         if(store.store.session){
            session = store.store.session;
         }
         else{
            session=localStorage.getItem('token');
         }
         getStores(session).then((res)=>{
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
                   itemList: store.itemList
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
          /*setStores({
             1:{
               "id": 1,
               "name": "Apple Store",
               "revenue": 0.0,
               "items": []
             },
             2:{
               "id": 1,
               "name": "Apple Store",
               "revenue": 0.0,
               "items": []
             }
          })*/
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
          <Grid container spacing={4} style={{width:"80%", margin:"10%", marginTop:"10px"}}>
          {
          stores && 
            Object.keys(stores).map((key,index)=>{
             const store = stores[key]    
             return(
              <Grid index = {index} item xs={10} sm={6} md={6}>       
             <StoreCard handleClick={props.handleSelect} id ={store.id} name={store.name} index ={index}/>
              </Grid>
             )  
          })
          }
         </Grid>
     </div>
    );
}