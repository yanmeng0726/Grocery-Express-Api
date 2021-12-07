import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function DroneDropdown(props) {
    const handleChange = (event) => {
        props.setDrone(event.target.value);
      };
    
      return (
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Drone</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={props.drone}
              onChange={handleChange}
              label="Drone"
            >
            {
              
              props.drones.map((drone, idx) => {
                      return(
                        <MenuItem key={idx} value={drone.id}><div>{`id: ${drone.id} load: ${drone.weight_limit}`}</div></MenuItem> 
                      
                      )
              })
            }
            </Select>
          </FormControl>
        </div>
      )
}
