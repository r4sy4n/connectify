const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

//POST Endpoint to create user
router.post('/register', ( request, response ) => {
    User.find({ $or: [ { username: request.body.username }, { email: request.body.email } ]}).then(dbResponse => {
        if( dbResponse.length > 0 ){
            response.status( 400 ).send({ error: 'Please use unique username or email' });
        }else{
             bcrypt.hash( request.body.password, 10 ).then((hash, err) => {
                const newUser = new User({ username: request.body.username, email: request.body.email, firstname: request.body.username, lastname: request.body.lastname, phone: request.body.phone, password: hash, usertype: request.body.usertype });
                newUser.save().then( dbResponse => {
                    response.status( 201 ).send({ newUser: dbResponse });
                });
            });
        };
    })
});

//POST Endpoint to login user
router.post('/login', ( request, response ) => {
    User.findOne({ email: request.body.email }).then( dbResponse => {
        if( !dbResponse ){
            console.log('Email does not exist')
            return response.status( 404 ).send({ error: 'Email does not exist' });
        }
        bcrypt.compare( request.body.password, dbResponse.password ).then( isValid => {
            if( !isValid ){
                response.status( 400 ).send({ error: 'Please enter correct email or password!' });
            }else{
                //create token
                const token = jwt.sign({ id: dbResponse._id, email: dbResponse.email }, SECRET );
                response.status( 200 ).send({ message: 'Login Successful', token: token, usertype: dbResponse.usertype, id: dbResponse.id, email: dbResponse.email });
            };
        });
    });
});

module.exports = router;