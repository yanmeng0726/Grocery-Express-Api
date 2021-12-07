import React, { useState, useRef, useEffect, useContext }   from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {getStores, addStore, addItemToStore} from '../../req/Utils'

import {NewItemDialog} from '../Component/NewItemPopUp'
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
import { StoreContext } from '../../StoreContext';


export const ItemManagementPage = (props) =>{
    const [newStoreDlgOpen, setNewStroeDlgOpen] = useState(false); 
    const [newItemDlgOpen, setNewItemDlgOpen ] = useState(false);
    const [selectedStore, setSelectedStore ] = useState("");
    const [selectedName, setSelctedName ] = useState("");
    const session = localStorage.getItem('token')
    const isMounted = useRef(false);
    

    const confirmAddItem = (storeId, name, weight, price) =>{
      addItemToStore(storeId,name,weight, price,session ).then(
        (res)=>{
          console.log(res)
          let store = props.stores[storeId];
          store.itemList.push(res);
          props.stores[storeId]=store;
          props.setStores(props.stores);
          alert(`Add ${name} to ${selectedName} successfuly!`)
          closeNewItemDlg();
          //update stores   
        }
      ).catch(
         (e) =>{
           alert(e)
           closeNewItemDlg();
         }
      )
    }

    const openNewItemDlg =(storeId, name) =>{
      setNewItemDlgOpen(true);
      setSelectedStore(storeId);
      setSelctedName(name);
    }

    const closeNewItemDlg =() =>{
      setNewItemDlgOpen(false)
    }

    const expandCallback = (storeId, expanded) =>{
      let store = props.stores[storeId]
      store['expanded']=expanded;
      props.stores[storeId] =store;
      props.setStores(props.stores);
    }

    return(
     <div>
         <div style={{display:"flex", position:"relative", left:'5%'}}>
           <div style ={{width : "80%"}}>
            {
              props.stores&&Object.keys(props.stores).map((key, index) => {
                const store = props.stores[key];
                return(
                <StoreItem key={index} id={store.id} name= {store.name} revenue={store.revenue} expanded={store.expanded} items={store.itemList} openDlg={openNewItemDlg} closeDlg={closeNewItemDlg} expandCallback={expandCallback} showRevenue={true} isItem={true}/>)
              })
            }
           </div> 
         </div>
        
         {
             newItemDlgOpen && <NewItemDialog open ={newItemDlgOpen} handleClose={closeNewItemDlg} handleConfirm={confirmAddItem} id={selectedStore} name={selectedName}/>
         }        
     </div>
    );
}