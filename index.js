require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

//mongoose config
mongoose.connect(``)

PORT = 8000;

const server = express();
server.use( bodyParser.json() );
server.use( cors() );
server.use( helmet() );
//morgan

server.get('/', ( request, response ) => {
    response.status(200).send(`Welcome to Express App`);
});

server.listen( PORT, () => { console.log(`Server currently running on port ${PORT}`)});