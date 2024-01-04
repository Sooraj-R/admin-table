import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {capitalize} from 'lodash'

export default function FilterDropDown(props) {
    const {defaultValue, inputProps, data, label, setValue , minWidth, error, helpText, required} = props
  return (
    <Box sx={{ minWidth: minWidth? minWidth: 120 }}>
      <FormControl sx={{ minWidth: minWidth? minWidth: 200 }} error={error} required={required}>
        <InputLabel variant="standard" htmlFor={inputProps.id}>
          {label}
        </InputLabel>
        <NativeSelect
        defaultValue = {defaultValue}
        inputProps = {{inputProps}}
        onChange={(e)=>setValue && setValue(e.target.value, inputProps.name)}
        >
          <option value={defaultValue}>{capitalize(defaultValue)}</option>
          {data.map((name) => (
              <option value={name} key={name} >{capitalize(name)}</option>
          ))}
        </NativeSelect>
        {error &&
          <span style={{color:'#d32f2f'}}>{helpText}</span>
        }
      </FormControl>
    </Box>
  );
}
