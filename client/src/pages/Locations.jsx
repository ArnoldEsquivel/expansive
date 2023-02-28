import React, { useEffect, useState } from "react";
import './Locations.scss'
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Locations() {
    const [markerInfo, setMarkerInfo] = useState({
        nombre: '',
        descripcion: '',
        lat: '',
        lng: '',
    });

    useEffect(() => {
        initMap()
    }, []);

    const initMap = async () => {

        const uluru = { lat: 19.423403, lng: -99.175643 };

        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: uluru,
        });

        await axios.get('/getUbicaciones')
            .then((res) => {
                res.data.forEach((marker) => {
                    const markerMap = new google.maps.Marker({
                        position: { lat: marker.lat, lng: marker.lng },
                        map: map,
                        title: marker.nombre
                    });

                    markerMap.addListener("click", () => {
                        handleMarkerClick(marker);
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleMarkerClick = (marker) => {
        setMarkerInfo(marker);
    }

    return (
        <div className="pageContainerLocations">
            <div className="markerInfoContainer">
                <IconButton
                    className="backButton"
                    onClick={() => window.location.href = '/'}
                >
                    <ArrowBackIcon />
                </IconButton>
                <div className="titleContainer">
                    <h1 className="title">Descrubre todas nuestras ubicaciones</h1>
                </div>
                <h3 className="noMarkerInfoText">Aqui podrás ver la información de cualquiera de nuestras ubicaciónes</h3>
            </div>
            <div className="markerInfo">
                {
                    markerInfo.nombre
                        ? <>
                            <span>{markerInfo.nombre}</span>
                            <span className="descStyle">{markerInfo.descripcion}</span>
                            <div className="latLngContainer">
                                <span>Lat: {markerInfo.lat}</span>
                                <span>Lng: {markerInfo.lng}</span>
                            </div>
                        </>
                        : <span className="makerTextNoInfo">Selecciona una ubicación para ver su información</span>
                }
            </div>
            <div className="mapContainer">
                <div id='map' className="mapsMap">
                </div>
            </div>
            <div className="btnContainer">
                <Button
                    className="adminButton"
                    variant="contained"
                    onClick={() => window.location.href = '/admin'}
                >
                    Administrar Ubicaciones
                </Button>
            </div>
        </div>
    );
}