const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/maps';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a la base de datos');
}).catch(err => {
    console.error('Error de conexión a la base de datos:', err.message);
});

module.exports = mongoose;
