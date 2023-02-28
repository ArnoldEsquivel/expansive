const mongoose = require('mongoose');

// const uri = 'mongodb://127.0.0.1:27017/maps';
const uri = "mongodb+srv://Arnold:oEsWSQrzVTREkhMB@cluster0.mxcifpg.mongodb.net/maps?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a la base de datos');
}).catch(err => {
    console.error('Error de conexión a la base de datos:', err.message);
});

module.exports = mongoose;
