import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function NewSensor () {
    const handleSubmission = (new_id, new_num, new_type) => {
        const new_sensor = {
            sensor_id: new_id,
            sensor_num: new_num,
            type_of_sensor: new_type
        }
        console.log(new_sensor);
    };

    const types_of_sensor = [
        {
          value: 'cardiac',
          label: 'cardiac',
        },
        {
          value: 'lung',
          label: 'lung',
        },
        {
          value: 'cerebral',
          label: 'cerebral',
        }
      ];

    return(
        <div>
            <h1>Adicionar novo sensor:</h1>
            <TextField id="outlined-basic" label="ID do sensor" variant="outlined" /> <br /> <br />
            <TextField id="outlined-basic" label="Número do sensor" variant="outlined" /><br /> <br />
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
                <TextField
                id="outlined-select-currency"
                select
                label="Tipo de sensor"
                defaultValue="cardiac"
                >
                {types_of_sensor.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </Box>
        </div>
    )
}