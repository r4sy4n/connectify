
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const upload = require('../middlewares/upload')
const { uploadFiles, removeFiles } = require('../services/cloudinary');

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
            response.status( 200 ).send({ user: dbResponse });
        }
        else {
            response.status( 404 ).send({ error: "User Does Not Exist" });
        }
    });
});

// get order list
// api/v1/users/:userId/order-list
router.get('/:userId/order-list', (request, response) => {
    User.findOne({ _id : request.params.userId }).populate('orderList').then(dbResponse => {
        if (dbResponse.orderList !== 0) {
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
    User.findOne({ _id : request.params.userId }).populate('productList.productId').then(dbResponse => {
        if (dbResponse.productList.length !== 0) {
            response.status( 200 ).send({ productList: dbResponse.productList });
        }
        else {
            response.status( 204 ).send({ message: "Empty" });
        }
    });
});


// PUT REQUESTS

// change user info
// api/v1/users/:userId
router.put('/:userId', upload.single('userImage'), (request, response) => {
    
    User.findOne({ _id: request.params.userId }).then(dbResponse => {
        const imageData = uploadFiles(request.file.path, `Connectify/${ dbResponse.userType }/${request.params.userId}/Profile Images`).then(data => {
    
            const {
                username,
                password,
                firstName,
                lastName,
                email,
                phone,
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
                    image: [{
                        url: data.url,
                        public_id: data.public_id
                    }],
                    shopName: shopName,
                    shopURL: shopURL,
                    shopLogo: shopLogo
                    }
            )
            .then(dbResponse => {
                response.status( 200 ).send({ message: 'Update Success' });
            })
            .catch((error) => {
                response.status( 500 ).send({ message: 'Server Error' });
            })
            console.log(data)
        
        })
    })
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

// add orders
// api/v1/users/:userId/order-list
router.put('/:userId/order-list', (request, response) => {
    const userId = request.params.userId;
    const orderId = request.body.orderId;

    //update the book with the specific id
    User.updateOne( 
        { _id: userId },
        {
            $push: {
                orderList: orderId
            }
        }
    )
    .then( dbResponse => {
        response.status( 200 ).send({ message: 'Success', dbResponse });
    });
});

module.exports = router;