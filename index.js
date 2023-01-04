const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Direcctorio Público
app.use(express.static('public'));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));


app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado en puerto ${process.env.PORT}`);
})