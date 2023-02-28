const express = require('express');
const router = express.Router();
const Ubicacion = require('../models/ubicaciones.js');

router.get('/getUbicaciones', (req, res) => {
    Ubicacion.find({}, (err, ubicaciones) => {
        if (err) {
            return res.status(500).send('Error al consultar las ubicaciones');
        }
        res.send(ubicaciones);
    });
});

router.post('/saveUbicacion', (req, res) => {
    const ubicacion = new Ubicacion(req.body);
    ubicacion.save((err, ubicacion) => {
        if (err) {
            return res.status(500).send('Error al guardar la ubicación') && console.log(err);
        }
        res.status(201).send(ubicacion);
    });
});

router.put('/updateUbicacion/:id', (req, res) => {
    const _id = req.params.id;
    const ubicacionEdit = req.body;
    Ubicacion.findByIdAndUpdate(_id, ubicacionEdit, (err, ubicacion) => {
        if (err) {
            return res.status(500).send('Error al actualizar la ubicación');
        }
        res.status(200).send(ubicacion);
    });
});

router.delete('/deleteUbicacion/:id', (req, res) => {
    const _id = req.params.id;
    Ubicacion.findByIdAndDelete(_id, (err, ubicacion) => {
        if (err) {
            return res.status(500).send('Error al eliminar la ubicación');
        }
        res.status(200).send(ubicacion);
    });
});

module.exports = router;