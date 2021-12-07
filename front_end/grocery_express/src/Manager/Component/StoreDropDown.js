import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function StoreDropdown(props) {
  const [store, setStore] = React.useState("");

  const handleChange = (event) => {
    setStore(event.target.value);
    props.handleGetOrders(event.target.value);   
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Store</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={store}
          onChange={handleChange}
          label="Pilot"
          style={{width:"200px"}}
        >
          {
            props.stores && Object.keys(props.stores).map(
              (key,idx)=>{
                const store = props.stores[key]
                return(<MenuItem index={idx} value={store.id}>{store.name}</MenuItem>)
              }
            )
         }
        </Select>
      </FormControl>
    </div>
  );
}
