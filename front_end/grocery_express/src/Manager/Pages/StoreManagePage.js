import React, { useState, useRef, useEffect, useContext }   from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {getStores, addStore, addItemToStore} from '../../req/Utils'
import {NewStoreDialog} from '../Component/NewStorePopUp'
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


export const StoreManagePage = (porps) =>{
    const store= useContext(StoreContext)
    const [stores, setStores] = useState(null);
    const [newStoreDlgOpen, setNewStroeDlgOpen] = useState(false); 
    const [newItemDlgOpen, setNewItemDlgOpen ] = useState(false);
    const [selectedStore, setSelectedStore ] = useState("");
    const [selectedName, setSelctedName ] = useState("");

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
         var session ="";
         if(store.session){
           session=stores.session
         }
         getStores(session).then((res)=>{
           let stores = [];
           if(res){
             console.log(res)
             const keys = Object.keys(res)
             for ( let i = 0; i<keys.length ; i++){
                let store = res[keys[i]];
                let storeItem = 
                {
                   id : store.id,
                   name : store.name,
                   revenue  : store.revenue,
                   expanded: false,
                   itemList: store.items
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

    const confirmAddStore = (storeName) =>{
        addStore(storeName).then((res)=>{
             alert("Add a store successfuly!")
                let storeItem = 
                {
                   id : res.id,
                   name : res.name,
                   revenue  : res.revenue,
                   expanded: false,
                   itemList: []
                } 
                stores[res.id]=storeItem;
                closeNewStoreDlg();
                setStores(stores);
             //update the store list
           }
          ).catch((e)=>{
              alert(e)
              closeNewStoreDlg();
            })    
    }

    const confirmAddItem = (storeId, name, weight, price) =>{
      addItemToStore(storeId,name,weight, price ).then(
        (res)=>{
          console.log(res)
          let store = stores[storeId];
          store.itemList.push(res);
          stores[storeId]=store;
          setStores(stores);
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


    const openNewStoreDlg =() =>{
       setNewStroeDlgOpen(true); 
    }

    const closeNewStoreDlg =() =>{
       setNewStroeDlgOpen(false); 
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
      let store = stores[storeId]
      store['expanded']=expanded;
      stores[storeId] =store;
      setStores(stores);
    }

    return(
     <div>
         <h1>Store Management</h1>
         <Divider/>
         <div style={{display:"flex", position:"relative", left:'10%'}}>
           <div style ={{width : "60%"}}>
            {
              stores&&Object.keys(stores).map((key, index) => {
                const store = stores[key];
                return(
                <StoreItem key={index} id={store.id} name= {store.name} revenue={store.revenue} expanded={store.expanded} items={store.itemList} openDlg={openNewItemDlg} closeDlg={closeNewItemDlg} expandCallback={expandCallback}/>)
              })
            }
           </div>
           <div>
           <Button onClick={openNewStoreDlg}>Add a Store</Button>
           </div>  
         </div>
         {
             newStoreDlgOpen&& <NewStoreDialog open={newStoreDlgOpen} handleClose={closeNewStoreDlg} handleConfirm={confirmAddStore}/>
         }
         {
             newItemDlgOpen && <NewItemDialog open ={newItemDlgOpen} handleClose={closeNewItemDlg} handleConfirm={confirmAddItem} id={selectedStore} name={selectedName}/>
         }        
     </div>
    );
}