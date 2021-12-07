 /*drone_id: null
      employee_id: null
      id: 16
      lines: []
      order_status: 1
      store_id: 1
      total_cost: 100.27
      total_weight: 30.26
      user_id: 5*/

      import * as React from 'react';
      import { IconButton } from '@mui/material';
      import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
      import { faChevronCircleDown, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons'
      import Button from '@mui/material/Button';
      import { AddedStoreItem } from './AddedStoreItem';
      import {PilotDropdown} from '../Component/PilotDropdown'
      import {DroneDropdown} from '../Component/DroneDropdown'
      import {Box} from '@mui/material'

      
      export const  OrderItem =(props) =>{
        const [expanded, setExpanded] = React.useState(props.expanded)
        const [pilot, setPilot] = React.useState(-1)
        const [drone, setDrone ]= React.useState(-1)
          
        const handleConfirm =()=>{
          if(pilot===-1||drone ===-1){
            alert("Please assign the order when there are available pilot or drone!")
            return;
          }
           props.handleAssign(props.storeId,props.id , pilot,drone)
        }

          const status ={
             0: "Cancel",
             1: "Pending",
             2: "In Delievery",
             3: "Shipped"
          }
      
          return (
            <Box boxShadow={3} style={{width:"100%", padding:"30px", }}>
            <div style={{display: "flex", position: "relative", width: "100%", height:"50px", alignItems:"center" }}>
               <div style={{display : "flex", width:"10%", marginLeft : '10%'}}>{<p><b>{`OrderId: `}</b>{props.id}</p>}</div>
               <div style={{display : "flex", width:"20%", marginLeft : '20%'}}>{<p><b>{`Status: `}</b>{status[props.status]}</p>}</div>        
               {props.status===1&&props.pilots.length>0 &&props.drones.length>0&&<div style={{marginLeft:"20px", marginLeft : '5%'}}><PilotDropdown pilot={pilot} pilots={props.pilots} setPilot={setPilot}/></div>}
               {props.status===1&&props.pilots.length>0&&props.drones.length>0&&<div style={{marginLeft:"20px", marginLeft : '5%'}}><DroneDropdown drone={drone} drones={props.drones} setDrone={setDrone}/></div>}
                {props.status===1&&<div><Button onClick={handleConfirm}  style={{width:"150px", height:"60px"}}>Assign Order</Button></div>}
               
            </div> 
            {
              props.items&&props.items.length>0 && expanded && <div style={{position:"relative", left:"10%"}}>
                 {
                   props.items.map((item,index)=>{
                     return(
                       <AddedStoreItem key={index} name={item.name} price={item.unit_price} weight={item.weight}/>
                     )
                   })
                 }
              </div>        
            }
            </Box>    
          );
        
          }