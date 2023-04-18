import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function NewSensor () {
    const handleSubmission = () => {
        const new_id = document.getElementById("id").value;
        const new_num = document.getElementById("num").value;
        const new_type = document.getElementById("type_of_sensor").innerHTML;

        const data = {
            sensorid: new_id,
            sensornum: new_num,
            type_of_sensor: new_type
        }

        axios.post("http://localhost:8080/sensors/new", data)
        .then((response) => {
            console.log(response.data);
            alert(response.data.info);
        })
        .catch((err) => console.log(err));
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
            <TextField id="id" label="ID do sensor" variant="outlined" /> <br /> <br />
            <TextField id="num" label="Número do sensor" variant="outlined" /><br /> <br />
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
                <TextField
                id="type_of_sensor"
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
            <Button variant="contained" size="large" onClick={handleSubmission}>Adicionar sensor</Button>
        </div>
    )
}