import React, { useState, useRef, useEffect, useContext }   from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {getStores} from '../../req/Utils'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import {StoreItem} from "../Component/StoreItem"


export const StoreManagePage = (porps) =>{
    const [stores, setStores] = useState([]);
    const isMounted = useRef(false);
    
    useEffect(() => {
      isMounted.current = true;
      initStores();
      return () => {
        isMounted.current =false;
      }
    }, [])
  
   const initStores =() => {
       if(isMounted.current){
         getStores().then((res)=>{
           let stores = [];
           if(res){
             const keys = Object.keys(res)
             console.log(keys);
             for ( let i = 0; i<keys.length ; i++){
                let store = res[keys[i]];
                let storeItem = 
                {
                   id : store.id,
                   name : store.name,
                   revenue  : store.revenue
                } 
                stores.push(storeItem);
            }
            console.log(stores);
            setStores(stores);
           }
          }
         ).catch(console.error)
       }
    }
    return(
     <div>
         <h>Store Management</h>
         <Divider/>
         <div style={{display:"flex"}}>
           <div>
            {
              stores.map((store) => {
                console.log(store.name);
                return(
                <StoreItem name= {store.name} revenue={store.revenue} expanded={false}/>)
              })
            }
           </div>
           <div>
           <Button>Add a Store</Button>
           </div>  
         </div>
     </div>
    );
}