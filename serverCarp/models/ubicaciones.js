const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ubicacionSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
});

module.exports = mongoose.model('Ubicacion', ubicacionSchema);