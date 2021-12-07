import React,{useRef, useContext, useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import { StoreContext } from '../../StoreContext';

import { IconButton } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {useNavigate} from 'react-router-dom'
import {getStores, addStore} from '../../req/Utils'
import {NewStoreDialog} from '../Component/NewStorePopUp'
import {ItemManagementPage} from './StoreItemManagePage'
import { DroneManagementPage } from './StoreDroneManagementPage';
import { PilotManagementPage } from './StorePilotManagementPage';

export  function StoreManagementPage(props) {
    const isMounted =useRef(false);
    const context = useContext(StoreContext);
    const session = localStorage.getItem('token')
    const [value, setValue] = React.useState(0);
    const [newStoreDlgOpen, setNewStroeDlgOpen] = useState(false); 
    const [stores, setStores] =useState({});
    const [user,setUser] = useState({})
    const navigate = useNavigate()
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    
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
                     itemList: store.items,
                     drones:store.drones,
                     pilots: store.employees
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

    const closeNewStoreDlg =() =>{
        setNewStroeDlgOpen(false); 
     }

     const openNewStoreDlg =() =>{
         setNewStroeDlgOpen(true)
     }

     const confirmAddStore = (storeName) =>{
        addStore(storeName,session).then((res)=>{
             alert("Add a store successfuly!")
                let storeItem = 
                {
                   id : res.id,
                   name : res.name,
                   revenue  : res.revenue,
                   expanded: false,
                   itemList: [],
                   drones:[],
                   pilots: []
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
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent:"center",
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '90%',
          },
        }}
      >
        <Paper elevation={3} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> 
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Items Management" >Items Management</Tab>
          <Tab label="Pilot Management" >Pilot Management</Tab>
          <Tab label="Drone Management" >Drone Management</Tab>
          <IconButton onClick={openNewStoreDlg}size={'large'} title={'Add New Store'} color="primary"><AddCircleIcon style={{fontSize:"30px"}}/></IconButton>
        </Tabs>
        </Box>
         {
            value==0&& <ItemManagementPage stores={stores} setStores={setStores}/>
         }
         {
            value==1&& <PilotManagementPage stores={stores} setStores={setStores}/>
         }
         {
            value==2 && <DroneManagementPage stores={stores} setStores={setStores}/>
         }

         {
           newStoreDlgOpen&& <NewStoreDialog open={newStoreDlgOpen} handleClose={closeNewStoreDlg} handleConfirm={confirmAddStore}/>
         }
        </Paper>  
      </Box>
    );
  }
 