import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function PilotDropdown(props) {
console.log(props.pilot)
  

  const handleChange = (event) => {
    props.setPilot(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Pilot</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.pilot}
          onChange={handleChange}
          label="Pilot"
        >
        {
          
          props.pilots.map((pilot, idx) => {
             
                  return(
                    <MenuItem key={idx} value={pilot.id}><div>{`${pilot.first_name} ${pilot.last_name}`}</div></MenuItem> 
                  )
        
          })
        }
        </Select>
      </FormControl>
    </div>
  );
}
