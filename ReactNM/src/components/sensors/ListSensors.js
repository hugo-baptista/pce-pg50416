import React,{ useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from 'react-router-dom';

import axios from 'axios';

export default function ListSensors() {
  const baseURL = "http://localhost:8080/sensors/list";

  const [sensorList, setSensorList] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setSensorList(response.data);
      console.log(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:8080/sensors/delete/"+id)
    .then((response) => {
      // alert(response.data.info)
      window.location.reload();
    })
    .catch((err) => console.log(err));
  }
  
  return (
    <div>
      <h2>Lista de Sensores Existentes:</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sensores (ID)</TableCell>
              <TableCell align="right">Número do Sensor</TableCell>
              <TableCell align="right">Tipo de Sensor</TableCell>
              <TableCell align="right">Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensorList.map((sensor) => (
              <TableRow
                key={sensor.sensor_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {sensor.sensor_id}
                </TableCell>
                <TableCell align="right">{sensor.sensor_num}</TableCell>
                <TableCell align="right">{sensor.type_of_sensor}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" size="small" color='success' onClick={() => window.location.replace("http://localhost:3000/editsensor/"+sensor.sensor_id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" color='error' onClick={() => handleDelete(sensor.sensor_id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}