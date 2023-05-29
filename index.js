require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

//mongoose config
mongoose.connect(`mongodb+srv://${ process.env.MONGODB_ACCOUNT }@connectify.rnfmx1x.mongodb.net/connectifydb`);

//Routes
const OrderRoutes = require('./routes/order');

const PORT = process.env.PORT || 8000

const server = express();
server.use( bodyParser.json() );
server.use( cors() );
server.use( helmet() );
//morgan

const baseURL = '/api/v1';

server.get('/', ( request, response ) => {
    response.status(200).send( `Welcome to Connectify App` );
});

server.use( `${baseURL}/orders`, OrderRoutes );

server.listen( PORT, () => { console.log( `Server currently running on port ${PORT}` ) });