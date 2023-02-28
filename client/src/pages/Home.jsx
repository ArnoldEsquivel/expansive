import React from "react";
import { IconButton } from "@mui/material";
import "./Home.scss";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

export default function Home() {
    return (
        <div>
            <div className="titleHomeContainer">
                <h1>Bienvenido</h1>
                <span>Aqui podras visualizar en un mapa y administrar todas las ubicaciónes que desees</span>
            </div>
            <div className='spanQueHacerContainer'>
                <span>Que deseas hacer primero?</span>
            </div>
            <div className="buttonsHomeContainer">
                <div className="buttonLocationsContainer">
                    <span>Ver ubicaciónes?</span>
                    <IconButton
                        color="error"
                        className="iconButtonLocations"
                        variant="contained"
                        onClick={() => window.location.href = '/locations'}
                    >
                        <LocationOnIcon sx={{ color: 'red', fontSize: '3rem' }} />
                    </IconButton>
                </div>
                <div className="buttonsAdminContainer">
                    <span>Administrar ubicaciónes?</span>
                    <IconButton
                        color="error"
                        className="iconButtonAdmin"
                        variant="outlined"
                        onClick={() => window.location.href = '/admin'}
                    >
                        <EditLocationAltIcon sx={{ color: 'red', fontSize: '3rem' }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}