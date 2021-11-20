import * as React from 'react';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';

export const  StoreItem =(props) =>{
    return (
      <div style={{display: "flex", position: "relative", width: "2000px", alignItems: "baseline", textAlign:"center"}}>
         <div style={{display : "flex"}}><b>{props.name}</b></div>
         <div style={{display : "flex"}}><b>Revenue:</b>{props.revenue}</div>
         <div><Button variant="contained">Add Item(s)</Button></div>
         <div><IconButton>{
           props.expanded?<FontAwesomeIcon icon={faChevronCircleDown}/>
          :
          <FontAwesomeIcon icon={faChevronCircleRight}/>
         }
         </IconButton>
         </div> 
      </div>    
    );
  
    }