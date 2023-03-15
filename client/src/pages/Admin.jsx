import React, { useState, useEffect } from "react";
import "./Admin.scss";
import CreateUb from "../components/CreateUb";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { CircularProgress } from "@mui/material";

export default function Admin() {
    const [ubicaciones, setUbicaciones] = useState();
    const [actualizar, setActualizar] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUbicaciones();
    }, [actualizar]);

    const getUbicaciones = async () => {
        await axios.get("/getUbicaciones")
            .then((res) => {
                setUbicaciones(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteUbicacion = async (ubicacion) => {
        await axios.delete('/deleteUbicacion/' + ubicacion._id)
            .then((res) => {
                setActualizar(!actualizar);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className="titleAdminContainer">
                <IconButton
                    className="backButtonAdmin"
                    onClick={() => window.location.href = '/'}
                >
                    <ArrowBackIcon />
                </IconButton>
                <h1>Administración de Ubicaciones</h1>
                <span>En este panel se podran editar <EditLocationAltIcon sx={{ color: 'green' }} />, agregar <ControlPointIcon sx={{ color: 'green' }} /> y eliminar <DeleteForeverIcon sx={{ color: 'red' }} /> todas las ubicaciones </span>
            </div>
            <div className="divTableAdjustWidth">
                <TableContainer className="tableContainerStyled">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className="tableCellHeader">Nombre</TableCell>
                                <TableCell align="center" className="tableCellHeader">Descripcion</TableCell>
                                <TableCell align="center" className="tableCellHeader">Latitud</TableCell>
                                <TableCell align="center" className="tableCellHeader">Longitud</TableCell>
                                <TableCell align="center" className="tableCellHeader">
                                    <CreateUb setActualizar={setActualizar} actualizar={actualizar} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                ubicaciones
                                    ? ubicaciones.map((ubicacion) => (
                                        <TableRow key={ubicacion._id}>
                                            <TableCell align="center" className="tableCellBody">{ubicacion.nombre}</TableCell>
                                            <TableCell align="center" className="tableCellBody">{ubicacion.descripcion}</TableCell>
                                            <TableCell align="center" className="tableCellBody">{ubicacion.lat}</TableCell>
                                            <TableCell align="center" className="tableCellBody">{ubicacion.lng}</TableCell>
                                            <TableCell align="center" className="tableCellBodyButtons">
                                                <CreateUb update={true} ubicacion={ubicacion} setActualizar={setActualizar} actualizar={actualizar} />
                                                <IconButton
                                                    color="error"
                                                    onClick={() => deleteUbicacion(ubicacion)}
                                                >
                                                    <DeleteForeverIcon sx={{ color: 'red' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow>
                                        <TableCell colSpan={5} align="center" className="tableCellBody">
                                            <CircularProgress sx={{color: '#212529'}} />
                                        </TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="buttonLocationsContainer">
                <Button
                    variant="contained"
                    className="buttonLocations"
                    onClick={() => window.location.href = '/locations'}
                >
                    Ver Mapa
                </Button>
            </div>
        </div>
    );
}