import React, { useState, useRef}   from 'react';

import { addDroneToStore} from '../../req/Utils'

import {NewDroneDialog} from '../Component/NewDronePopUp'

import {StoreItem} from "../Component/StoreItem"



export const DroneManagementPage = (props) =>{
    const [newDroneDlgOpen, setNewDroneDlgOpen ] = useState(false);
    const [selectedStore, setSelectedStore ] = useState("");
    const [selectedName, setSelctedName ] = useState("");
    const session = localStorage.getItem('token')
    const isMounted = useRef(false);
    

    const confirmAddDrone = (storeId, weightlimit) =>{
      addDroneToStore(storeId,weightlimit,session ).then(
        (res)=>{
          console.log(res)
          let store = props.stores[storeId];
          store.drones.push(res);
          props.stores[storeId]=store;
          props.setStores(props.stores);
          alert(`Add ${res.id} to ${selectedName} successfuly!`)
          closeNewDroneDlg();
          //update stores   
        }
      ).catch(
         (e) =>{
           alert(e)
           closeNewDroneDlg();
         }
      )
    }

    const openNewDroneDlg =(storeId, name) =>{
      setNewDroneDlgOpen(true);
      setSelectedStore(storeId);
      setSelctedName(name);
    }

    const closeNewDroneDlg =() =>{
      setNewDroneDlgOpen(false)
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
                <StoreItem key={index} id={store.id} name= {store.name} revenue={store.revenue} expanded={store.expanded} drones={store.drones} openDlg={openNewDroneDlg} closeDlg={closeNewDroneDlg} expandCallback={expandCallback}  isDrone={true}/>)
              })
            }
           </div> 
         </div>
        
         {
             newDroneDlgOpen && <NewDroneDialog open ={newDroneDlgOpen} handleClose={closeNewDroneDlg} handleConfirm={confirmAddDrone} id={selectedStore} name={selectedName}/>
         }        
     </div>
    );
}