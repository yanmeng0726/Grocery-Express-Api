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
import { OrderItem } from '../Component/OrderItem';
import { StoreContext } from '../../StoreContext';
import { StoreDropdown } from '../Component/StoreDropDown';
import { getUserOrders } from '../../req/Utils';


export const AssignOrderPage = (porps) =>{
    const context= useContext(StoreContext)
    const session= localStorage.getItem('token')
    const [stores, setStores] = useState(null);
    const [orders, setOrders ]= useState({});
    const [drones, setDrones] =useState([]);
    const [pilots, setPilots] =useState([]);
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
         getStores(session).then((res)=>{
           let stores = {};
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
                   drones: store.drones,
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
    

    const handleGetOrders = (storeId) =>{
        console.log(storeId)
        getUserOrders(2,session).then((res)=>{
            var newOrders={};
            res.map((order) => {
                console.log(order)
              newOrders[order.id]= order
            })
            console.log(newOrders)
            setOrders(newOrders)
           
            setPilots(stores[storeId].pilots);
            setDrones(stores[storeId].drones);
        }
        ).catch(
            (err)=>{'Fail to get orders of store'}
        )
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
    
    /*[{"id":13,"user_id":2,"store_id":1,"drone_id":null,"employee_id":null,"total_cost":100.27,"total_weight":30.26,"order_status":1,"lines":[]},*/
    return(
     <div>
         <h1 style={{color:"grey"}}>Order Management</h1>
         <Divider/>
         <div style={{position:"relative", left:"4%", width:"200px", paddingBottom:"30px"}}><StoreDropdown handleGetOrders={handleGetOrders} stores={stores}/></div>
         <Divider/>
         <div style={{display:"flex", position:"relative", left:"5%"}}>
           <div style ={{width : "85%"}}>
            {
              orders?
              Object.keys(orders).map((key, index) => {
                const order = orders[key];
                return(
                <OrderItem key={index} id={order.id} status={order.order_status} droneId={order.drone_id} pilot={order.emploee_id} drones={drones} pilots={pilots} openDlg={openNewItemDlg} closeDlg={closeNewItemDlg} expandCallback={expandCallback}/>)
              })
              :
              <div>There is no order to display!</div>
            }
           </div>
           <div>
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
