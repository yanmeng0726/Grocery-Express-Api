import React, { useState, useRef, useEffect, useContext }   from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {addItemToStore, addDroneToStore, addPilotToStore} from '../../req/Utils'

import {NewPilotDialog} from '../Component/NewPilotPopUp'
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


export const PilotManagementPage = (props) =>{
    const [newPilotDlgOpen, setNewPilotDlgOpen ] = useState(false);
    const [selectedStore, setSelectedStore ] = useState("");
    const [selectedName, setSelctedName ] = useState("");
    const session = localStorage.getItem('token')
    const isMounted = useRef(false);
    
    /*storeId, fn, ln, phone,ssn,license,experience, expiration, token*/
    const confirmAddPilot = (storeId, fn, ln, phone,ssn,license,experience, expiration) =>{
      addPilotToStore(storeId, fn, ln, phone,ssn,license,experience, expiration,session ).then(
        (res)=>{
          console.log(res)
          let store = props.stores[storeId];
          store.pilots.push(res);
          props.stores[storeId]=store;
          props.setStores(props.stores);
          alert(`Add ${res.id} to ${selectedName} successfuly!`)
          closeNewPilotDlg();
          //update stores   
        }
      ).catch(
         (e) =>{
           alert(e)
           closeNewPilotDlg();
         }
      )
    }

    const openNewPilotDlg =(storeId, name) =>{
      setNewPilotDlgOpen(true);
      setSelectedStore(storeId);
      setSelctedName(name);
    }

    const closeNewPilotDlg =() =>{
      setNewPilotDlgOpen(false)
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
                console.log(store)
                return(
                <StoreItem key={index} id={store.id} name= {store.name} revenue={store.revenue} expanded={store.expanded} pilots={store.pilots} openDlg={openNewPilotDlg} closeDlg={closeNewPilotDlg} expandCallback={expandCallback}  isPilot={true}/>)
              })
            }
           </div> 
         </div>
        
         {
             newPilotDlgOpen && <NewPilotDialog open ={newPilotDlgOpen} handleClose={closeNewPilotDlg} handleConfirm={confirmAddPilot} id={selectedStore} name={selectedName}/>
         }        
     </div>
    );
}