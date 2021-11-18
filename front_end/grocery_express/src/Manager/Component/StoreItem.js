import * as React from 'react';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons'

export const  ChuyingWorkSpace =(props) =>{
    return (
      <div style={{display: "flex", display: "relative"}}>
         <div style={{display : "flex"}}><b>{props.name}</b></div>
         <div style={{display : "flex"}}><b>Revenue:</b><p>{props.revenue}</p></div>
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