require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const baseURL = '/api/v1';
//mongoose config
mongoose.connect(``);

//import routes
const authRoutes = require('./routes/authRoutes');

const server = express();
server.use( bodyParser.json() );
server.use( cors() );
server.use( helmet() );
//morgan
server.use( morgan('dev') );

server.use( `${baseURL}/auth`, authRoutes );

server.get('/', ( request, response ) => {
    response.status(200).send(`Welcome to Express App`);
});

server.listen( PORT, () => { console.log(`Server currently running on port ${PORT}`)});