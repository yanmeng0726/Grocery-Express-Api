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
      
      export const  StoreItem =(props) =>{
        const [expanded, setExpanded] = React.useState(props.expanded)
          console.log(expanded)
          
          const  handleExpand =() =>{
            props.expandCallback(props.id, !expanded);
            setExpanded(!expanded);
            
          }
      
          return (
            <div>
            <div style={{display: "flex", position: "relative", width: "100%", height:"50px", alignItems: "center", textAlign:""}}>
               <div style={{display : "flex", width:"20%", marginLeft : '10%'}}><b>OrderId</b></div>
               <div style={{display : "flex", width:"20%", marginLeft : '10%'}}><b>{props.orderId}</b></div>
               <div><Button onClick={()=>{props.openDlg(props.id, props.name)}} variant="contained" style={{width:"150px", height:"30px"}}>Assign Order</Button></div>     
               {props.items&&props.items.length>0 && <IconButton onClick={()=>{handleExpand()}}>{
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
            </div>    
          );
        
          }