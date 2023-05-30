
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

// GET REQUESTS

// get users
// api/v1/users
router.get('/', (request, response) => {
    User.find().then(dbResponse => {
        response.status( 200 ).send({ users: dbResponse });
    });
});

// get a specific users
// api/v1/users/:userId
router.get('/:userId', (request, response) => {
    User.findOne({ _id: request.params.userId }).then(dbResponse => {
        if (dbResponse) {
            response.status( 200 ).send({ users: dbResponse });
        }
        else {
            response.status( 404 ).send({ error: "User Does Not Exist" });
        }
    });
});

// get order list
// api/v1/users/:userId/order-list
router.get('/:userId/order-list', (request, response) => {
    User.findOne({ _id : request.params.userId }).then(dbResponse => {
        if (dbResponse.orderList.length !== 0) {
            response.status( 200 ).send({ orderList: dbResponse.orderList });
        }
        else {
            response.status( 204 ).send({ message: "Empty" });
        }
    });
});

// get product list
// api/v1/users/:userId/product-list
router.get('/:userId/product-list', (request, response) => {
    User.findOne({ _id : request.params.userId }).then(dbResponse => {
        if (dbResponse.productList.length !== 0) {
            response.status( 200 ).send({ productList: dbResponse.productList });
        }
        else {
            response.status( 204 ).send({ message: "Empty" });
        }
    });
});


// POST REQUESTS

// create user
// api/v1/users/register
router.post('/register', ( request, response ) => {
    User.find({ $or: [ { username: request.body.username }, { email: request.body.email } ]}).then(dbResponse => {
        if( dbResponse.length > 0 ){
            response.status( 400 ).send({ error: 'Please use unique username or email' });
        }else{
             bcrypt.hash( request.body.password, 10 ).then((hash, err) => {
                const newUser = new User({
                    username: request.body.username,
                    password: hash,
                    email: request.body.email,
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    phone: request.body.phone,
                    image: '',
                    productList: [],
                    orderList: [],
                    usertype: request.body.usertype 
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
    User.findOne({ email: request.body.email }).select('+password').then( dbResponse => {
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
                    usertype: dbResponse.usertype, 
                    id: dbResponse._id, 
                    email: dbResponse.email
                }
                response.status( 200 ).send({ message: 'Login Successful', token: token, userDetails: userDetails });
            };
        });
    });
});


// PUT REQUESTS

// change user info
// api/v1/users/:userId
router.put('/:userId', (request, response) => {
    const {
        username,
        password,
        firstName,
        lastName,
        email,
        phone,
        image,
        shopName,
        shopURL,
        shopLogo
    } = request.body

    let hashedPassword;

    if(password) {
        bcrypt.hash( password, 10 ).then((hash, err) => {
            hashedPassword = hash;
        })
    }

    User.updateOne(
        { _id : request.params.userId },
        { 
            username: username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            image: image,
            shopName: shopName,
            shopURL: shopURL,
            shopLogo: shopLogo
            }
    )
    .then(dbResponse => {
        response.status( 200 ).send({ message: 'Update Success' });
    });
});

// add/remove products
// api/v1/users/:userId/product-list
router.put('/:userId/product-list', (request, response) => {
    const userId = request.params.userId;
    const {
        type,
        productId,
        productName,
        productDescription,
        productPrice,
        productImage
    } = request.body;
    let value;

    //will add the userId to the list of the user Reading the book
    if( type === 'add' ) {
        value = {
            $addToSet: {
                productList: {
                    productId: productId,
                    productName: productName,
                    productDescription: productDescription,
                    productPrice: productPrice,
                    productImage: productImage,
                }
            }
        }
    }

    //will remove the user from the list of the users Reading the book
    else if( type === 'remove' ) {
        value = {
            $pull: {
                productList: {
                    productId: productId
                }
            }
        }
    }

    //update the book with the specific id
    User.updateOne( 
        { _id: userId },
        value
    )
    .then( dbResponse => {
        response.status( 200 ).send({ message: 'Success', dbResponse });
    });
});

module.exports = router;