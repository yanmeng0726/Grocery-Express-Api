import * as React from 'react';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import { AddedStoreItem } from './AddedStoreItem';
import { AddedDroneItem } from './DroneItem';
import { AddedPilotItem } from './PilotItem'

export const  StoreItem =(props) =>{

  console.log(props.drones)
  const [expanded, setExpanded] = React.useState(props.expanded)
    console.log(expanded)
    
    const  handleExpand =() =>{
      props.expandCallback(props.id, !expanded);
      setExpanded(!expanded);
      
    }

    return (
      <div>
      <div style={{display: "flex", position: "relative", width: "100%", height:"50px", alignItems: "center", textAlign:""}}>
         <div style={{display : "flex", width:"20%", marginLeft : '10%'}}><b>{props.name}</b></div>
         {props.showRevenue &&<div style={{display : "flex", width:"20%", marginLeft : '13%'}}><b>Revenue:</b>{props.revenue}</div>}
         {props.isItem&&<div><Button onClick={()=>{props.openDlg(props.id, props.name)}} variant="contained" style={{width:"150px", height:"30px"}}>Add New Item</Button>
         </div>}
         {props.isDrone&&<div><Button onClick={()=>{props.openDlg(props.id, props.name)}} variant="contained" style={{width:"200px", height:"30px"}}>Add New Drone</Button>
         </div>}
         {props.isPilot&&<div><Button onClick={()=>{props.openDlg(props.id, props.name)}} variant="contained" style={{width:"200px", height:"30px"}}>Hire New Pilot</Button>
         </div>}

         {props.items&&props.items.length>0 && <IconButton style={{marginLeft:"20px"}} onClick={()=>{handleExpand()}}>{
           expanded?<FontAwesomeIcon icon={faChevronCircleDown}/>
          :
          <FontAwesomeIcon icon={faChevronCircleRight}/>
          }
         </IconButton>
           }
           {props.drones&&props.drones.length>0 && <IconButton style={{marginLeft:"20px"}} onClick={()=>{handleExpand()}}>{
           expanded?<FontAwesomeIcon icon={faChevronCircleDown}/>
          :
          <FontAwesomeIcon icon={faChevronCircleRight}/>
          }
         </IconButton>
           }
           {props.pilots&&props.pilots.length>0 && <IconButton style={{marginLeft:"20px"}} onClick={()=>{handleExpand()}}>{
           expanded?<FontAwesomeIcon icon={faChevronCircleDown}/>
          :
          <FontAwesomeIcon icon={faChevronCircleRight}/>
          }
         </IconButton>
           }
         
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
       {
        props.drones&&props.drones.length>0 && expanded && <div style={{position:"relative", left:"10%"}}>
           {
             props.drones.map((item,index)=>{
               return(
                 <AddedDroneItem {...item}/>
               )
             })
           }
        </div>        
      }
       {
        props.pilots&&props.pilots.length>0 && expanded && <div style={{position:"relative", left:"10%"}}>
           {
             props.pilots.map((item,index)=>{
               return(
                 <AddedPilotItem {...item}/>
               )
             })
           }
        </div>        
      }
      </div>    
    );
  
    }