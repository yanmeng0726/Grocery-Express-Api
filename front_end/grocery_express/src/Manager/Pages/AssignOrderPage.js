import React, { useState, useRef, useEffect, useContext }   from 'react';
import Divider from '@mui/material/Divider';
import {getStores} from '../../req/Utils'
import { OrderItem } from '../Component/OrderItem';
import { StoreContext } from '../../StoreContext';
import { StoreDropdown } from '../Component/StoreDropDown';
import { getOrdersOfStore,assignOrder } from '../../req/Utils';


export const AssignOrderPage = (porps) =>{
    const context= useContext(StoreContext)
    const session= localStorage.getItem('token')
    const [stores, setStores] = useState(null);
    const [orders, setOrders ]= useState({});
    const [drones, setDrones] =useState([]);
    const [pilots, setPilots] =useState([]);
    const [storeId, setStoreId] = useState(-1);
    const userId = context.store.user.user_id;
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
        getOrdersOfStore(storeId,session).then((res)=>{
            console.log(res)
            var newOrders={};
            res.map((order) => {
              newOrders[order.id]= order
            })
            console.log(newOrders);
            setOrders(newOrders);
            setStoreId(storeId);
            setPilots(stores[storeId].pilots);
            setDrones(stores[storeId].drones);
        }
        ).catch(
            (err)=>{'Fail to get orders of store'}
        )
    }

    const handleAssignOrder=(storeId,orderId,pilotId,droneId)=>{
        console.log(storeId,orderId,pilotId,droneId)
       assignOrder(storeId,orderId,pilotId,droneId,session).then(
         (res)=>{
           alert('You successfuly assign pilot and drone to order')
           var changeOrder = orders[orderId];
           changeOrder.order_status = 2;
           orders[orderId]=changeOrder;
           var temp ={}
           Object.keys(orders).map((key)=>{
             temp[key]=orders[key];
           })
           console.log(orders)
           setOrders(temp);
         }
         )
       .catch((err)=>{alert(err)})
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
                <OrderItem key={index} id={order.id} status={order.order_status} userId={userId} storeId={storeId} droneId={order.drone_id} pilot={order.emploee_id} drones={drones} pilots={pilots} handleAssign={handleAssignOrder}/>)
              })
              :
              <div>There is no order to display!</div>
            }
           </div>
           <div>
           </div>  
         </div>
           
     </div>
    );
}
