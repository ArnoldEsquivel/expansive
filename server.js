const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectionDB = require('./mongo.js');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;

// Importación de rutas
const ubicaciones = require('./serverCarp/routes/ubicaciones.js');

app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors({ origin: 'http://http://164.92.178.206:5173' }));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:5173');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

//     next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ubicaciones);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, "0.0.0.0", () => {
    console.log('Servidor iniciado en el puerto 3000');
});