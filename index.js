require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

//mongoose config
mongoose.connect(`mongodb+srv://${ process.env.MONGODB_ACCOUNT }@connectify.rnfmx1x.mongodb.net/connectifydb`);

PORT = 8000;

const server = express();
server.use( bodyParser.json() );
server.use( cors() );
server.use( helmet() );
//morgan

server.get('/', ( request, response ) => {
    response.status(200).send(`Welcome to Express App`);
});

server.get('/users', ( request, response ) => {
    response.status(200).send(`Users`);
});

server.listen( PORT, () => { console.log(`Server currently running on port ${PORT}`)});