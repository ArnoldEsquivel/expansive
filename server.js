const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectionDB = require('./mongo.js');

// Importación de rutas
const ubicaciones = require('./server/routes/ubicaciones.js');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ubicaciones);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});