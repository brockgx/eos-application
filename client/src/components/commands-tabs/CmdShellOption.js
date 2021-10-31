import React from 'react';
import {useState } from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";



export default function CmdShellOption(props) {

    const [value, setValue] = useState('')

    const handleChange = (event) => {
        props.changeShellOption(event.target.value)
        setValue(event.target.value)
    }

    return (
        <div style={{display: "flex", flexDirection: 'column'}}>
            <div style={{flex: 2}}>
            </div>
            <FormLabel>Command Shell Options</FormLabel>
            <FormControl style={{display: "flex", flex: 2}}>
                <Select
                    labelId="Command Shell Options"
                    id="Command Shell Options"
                    value={value}
                    onChange={handleChange}
                    variant="outlined"
                    defaultValue="Cmd"
                >
                    <MenuItem value={'Cmd'}>Cmd</MenuItem>
                    <MenuItem value={'Powershell'}>Powershell</MenuItem>
                    <MenuItem value={'WSL'}>WSL</MenuItem>
                </Select>
            </FormControl>
           
            
        </div>
    );
}