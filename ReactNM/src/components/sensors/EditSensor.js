import React,{ useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
import {types_of_sensor} from './types_of_sensor';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import axios from 'axios';

export default function EditSensor() {
    const { id } = useParams();

    const baseURL = "http://localhost:8080/sensors/" + id;

    const [loading, setLoading] = useState(true);
    // const [loaded, setLoaded] = useState(false);
    const [sensor, setSensor] = useState([]);
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setSensor(response.data[0]);
            setLoading(false);
            // setLoaded(true);
            console.log(response.data[0]);
        });
    }, []);

    const handleClear = () => {
        document.getElementById('num').value = sensor.sensor_num;
        document.getElementById("type_of_sensor").innerHTML = sensor.type_of_sensor;
    };
  
    const handleEdit = () => {
      let data = {
        sensor_id: id,
        new_info: {
            sensor_num: document.getElementById('num').value,
            type_of_sensor: document.getElementById('type_of_sensor').innerHTML
        }
      }

      axios.put("http://localhost:8080/sensors/update", data)
      .then((response) => {
        console.log(response.data);
        window.location.replace('http://localhost:3000/sensors');
      })
      .catch((err) => console.log(err));
    }
    
    if (loading) {
        return(
            <div>
                <h1>Editar sensor: {sensor.sensor_id}</h1>
                <p>Loading...</p>
            </div>
        )
    }

    return (
      <div>
        <h1>Editar sensor:</h1>
        {loading && <p>Loading...</p>}
        {!loading && (
        <div>
            <TextField disabled id="outlined-disabled" label="ID do sensor" defaultValue={sensor.sensor_id}/><br /> <br />
            <TextField id="num" label="Novo número do sensor" variant="outlined" defaultValue={sensor.sensor_num} focused/><br /> <br />
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
                label="Novo tipo de sensor"
                defaultValue={sensor.type_of_sensor}
                focused
                >
                {types_of_sensor.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </Box>
            <Button variant="outlined" size="large" onClick={handleClear} startIcon={<ClearIcon />}>
                Limpar
            </Button>
            <Button variant="contained" size="large" onClick={handleEdit} endIcon={<EditIcon />}>
                Editar
            </Button> <br /><br />
        </div>
        )}
        <Button 
            variant="contained" 
            onClick={() => window.location.replace('http://localhost:3000/sensors')}
            startIcon={<ArrowBackIcon />}
            >
            Voltar
        </Button>
    </div>
    );
}