import * as React from 'react';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';

export const  StoreItem =(props) =>{
    return (
      <div style={{display: "flex", position: "relative", width: "100%", alignItems: "baseline", textAlign:"center"}}>
         <div style={{display : "flex", width:"20%", marginLeft : '10%'}}><b>{props.name}</b></div>
         <div style={{display : "flex", width:"20%", marginLeft : '13%'}}><b>Revenue:</b>{props.revenue}</div>
         <div><Button variant="contained" style={{width:"150px", height:"30px"}}>Add Item(s)</Button></div>
         <div style={{display : "flex", width:"10%", marginLeft : '13%'}}><IconButton>{
           props.expanded?<FontAwesomeIcon icon={faChevronCircleDown}/>
          :
          <FontAwesomeIcon icon={faChevronCircleRight}/>
         }
         </IconButton>
         </div> 
      </div>    
    );
  
    }