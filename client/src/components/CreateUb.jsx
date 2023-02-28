import React, { useState } from 'react';
import './CreateUb.scss'
import axios from 'axios';
import { IconButton, Button, Alert, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

export default function CreateUb({ setActualizar, actualizar, update, ubicacion }) {
    const [open, setOpen] = useState(false);
    const [openConf, setOpenConf] = useState(false);
    const [loading, setLoading] = useState(false);
    const [valid, setIsValid] = useState(true);
    const [markerInfo, setMarkerInfo] = useState({
        nombre: "",
        descripcion: "",
        lat: 0,
        lng: 0,
    });
    const [ubicacionEdit, setUbicacionEdit] = useState( update ? {
        nombre: ubicacion.nombre,
        descripcion: ubicacion.descripcion,
        lat: ubicacion.lat,
        lng: ubicacion.lng
    } : '');

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleMarkerInfo = (e) => {
        setMarkerInfo({
            ...markerInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleMarkerLatLng = (e) => {
        if (/^-?\d*\.?\d*$/.test(e.target.value)) {
            setIsValid(true);
            setMarkerInfo({
                ...markerInfo,
                [e.target.name]: e.target.value,
            });
        } else {
            setIsValid(false);
        }
    };

    const handleCreateUb = async () => {
        setLoading(true);
        if (markerInfo.nombre && markerInfo.descripcion && markerInfo.lat && markerInfo.lng) {
            await axios.post('/saveUbicacion', {
                nombre: markerInfo.nombre,
                descripcion: markerInfo.descripcion,
                lat: markerInfo.lat,
                lng: markerInfo.lng
            })
                .then((res) => {
                    setOpenConf(true);
                    setOpen(false);
                    setActualizar(!actualizar)
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            alert('Faltan datos');
        }
    }

    const handleUpdateUb = async () => {
        setLoading(true);
        const id = ubicacion._id;
        if (ubicacionEdit.nombre && ubicacionEdit.descripcion && ubicacionEdit.lat && ubicacionEdit.lng) {
            await axios.put('/updateUbicacion/' + id, {
                nombre: ubicacionEdit.nombre,
                descripcion: ubicacionEdit.descripcion,
                lat: ubicacionEdit.lat,
                lng: ubicacionEdit.lng
            })
                .then((res) => {
                    setOpenConf(true);
                    setOpen(false);
                    setActualizar(!actualizar)
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            alert('Faltan datos');
        }
    }

    const handleUbicacionEdit = (e) => {
        setUbicacionEdit({
            ...ubicacionEdit,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div>
            <IconButton
                onClick={handleOpen}
                sx={{ color: 'green' }}
            >
                {
                    update
                        ? <EditLocationAltIcon sx={{ color: 'green' }} />
                        : <ControlPointIcon />
                }
            </IconButton>
            <Modal
                open={openConf}
                className="modalConfirm"
                onClose={() => { setOpenConf(false) }}
            >
                <Alert
                    action={
                        <IconButton
                            onClick={() => { setOpenConf(false) }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    severity='success'
                    variant='filled'
                    className='alertConfirm'
                >
                    Ubicación {markerInfo.nombre} creada con éxito
                </Alert>
            </Modal>
            <Modal
                open={open}
                onClose={handleClose}
                className='modalStyleCreateUb'
            >
                <div className='modalCreateUbContainer'>
                    <div className='titleCreateUb'>
                        <span>
                            {
                                update ? 'Editar ubicación' : 'Crear ubicación'
                            }
                        </span>
                    </div>
                    <div className='textFieldsContainer'>
                        <TextField
                            name="nombre"
                            label="Nombre"
                            variant="outlined"
                            onChange={update ? handleUbicacionEdit : handleMarkerInfo}
                            InputLabelProps={{ shrink: true }}
                            className='textFieldStyled'
                            defaultValue={update ? ubicacion.nombre : ''}
                        />
                        <TextField
                            name="descripcion"
                            label="Descripción"
                            variant="outlined"
                            onChange={update ? handleUbicacionEdit : handleMarkerInfo}
                            InputLabelProps={{ shrink: true }}
                            className='textFieldStyled'
                            defaultValue={update ? ubicacion.descripcion : ''}
                        />
                    </div>
                    <div className='textFieldsContainer'>
                        <TextField
                            error={!valid}
                            name="lat"
                            label="Latitud"
                            variant="outlined"
                            onChange={update ? handleUbicacionEdit : handleMarkerLatLng}
                            inputProps={{ type: "number" }}
                            InputLabelProps={{ shrink: true }}
                            className='textFieldStyled'
                            defaultValue={update ? ubicacion.lat : ''}
                        />
                        <TextField
                            error={!valid}
                            name="lng"
                            label="Longitud"
                            variant="outlined"
                            onChange={update ? handleUbicacionEdit : handleMarkerLatLng}
                            inputProps={{ type: "number" }}
                            InputLabelProps={{ shrink: true }}
                            className='textFieldStyled'
                            defaultValue={update ? ubicacion.lng : ''}
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => { update ? handleUpdateUb(ubicacion) : handleCreateUb() }}
                            color="success"
                            sx={{ marginBottom: '1rem' }}
                        >
                            {update ? 'Actualizar' : 'Crear'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}