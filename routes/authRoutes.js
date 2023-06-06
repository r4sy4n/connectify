const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;



// create user
// api/v1/users/register
router.post('/register', ( request, response ) => {
    User.find({ $or: [ { username: request.body.username }, { email: request.body.email } ]}).then(dbResponse => {
        if( dbResponse.length > 0 ){
            response.status( 400 ).send({ error: 'Please use unique username or email' });
        }else{
             bcrypt.hash( request.body.password, 10 ).then((hash, err) => {
                const newUser = new User({
                    username: '',
                    password: hash,
                    email: request.body.email,
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    shopName: request.body.shopName,
                    phone: request.body.phone,
                    image: {},
                    productList: [],
                    orderList: [],
                    userType: request.body.userType 
                });

                newUser.save().then( dbResponse => {
                    response.status( 201 ).send({ message: 'User Created Successfully' });
                });
            });
        };
    })
});

// login user
// api/v1/users/login
router.post('/login', ( request, response ) => {
    User.findOne({ email: request.body.email }).select('+password').lean().then( dbResponse => {
        if( !dbResponse ){
            return response.status( 404 ).send({ error: 'Email does not exist' });
        }
        bcrypt.compare( request.body.password, dbResponse.password ).then( isValid => {
            if( !isValid ){
                response.status( 400 ).send({ error: 'Please enter correct email or password!' });
            }else{
                //create token
                const token = jwt.sign({ id: dbResponse._id, email: dbResponse.email }, SECRET );
                const userDetails = {
                    userType: dbResponse.userType, 
                    id: dbResponse._id, 
                    email: dbResponse.email
                }
                response.status( 200 ).send({ message: 'Login Successful', token: token, userDetails: userDetails });
            };
        });
    });
});

module.exports = router;