
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
    User.find().lean().then(dbResponse => {
        response.status( 200 ).send({ users: dbResponse });
    })
    .catch((error) => {
        response.status( 500 ).send({ message: 'Server Error' });
    });
});

// get a specific users
// api/v1/users/:userId
router.get('/:userId', (request, response) => {
    User.findOne({ _id: request.params.userId }).lean().then(dbResponse => {
        if (dbResponse) {
            response.status( 200 ).send({ user: dbResponse });
        }
        else {
            response.status( 404 ).send({ error: "User Does Not Exist" });
        }
    })
    .catch((error) => {
        response.status( 500 ).send({ message: 'Server Error' });
    });
});

// get order list
// api/v1/users/:userId/order-list
router.get('/:userId/order-list', (request, response) => {
    User.findOne({ _id : request.params.userId }).lean().populate('orderList').then(dbResponse => {
        if (dbResponse.orderList !== 0) {
            response.status( 200 ).send({ orderList: dbResponse.orderList });
        }
        else {
            response.status( 204 ).send({ message: "Empty" });
        }
    })
    .catch((error) => {
        response.status( 500 ).send({ message: 'Server Error' });
    });
});

// get product list
// api/v1/users/:userId/product-list
router.get('/:userId/product-list', (request, response) => {
    User.findOne({ _id : request.params.userId }).lean().populate('productList.productId').then(dbResponse => {
        if (dbResponse.productList.length !== 0) {
            response.status( 200 ).send({ productList: dbResponse.productList });
        }
        else {
            response.status( 204 ).send({ message: "Empty" });
        }
    })
    .catch((error) => {
        response.status( 500 ).send({ message: 'Server Error' });
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
        shopName,
        shopURL,
        shopLogo,
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
    });
});

router.put('/:userId/password', (request, response) => {

    const password = request.body.password;

    bcrypt.hash( password, 10 ).then((hash, err) => {
        const hashedPassword = hash;
        
        User.updateOne(
            { _id : request.params.userId },
            { 
                password: hashedPassword
            }
        )
        .then(dbResponse => {
            response.status( 200 ).send({ message: 'Password Updated' });
        })
        .catch((error) => {
            response.status( 500 ).send({ message: 'Server Error' });
        });
    })
    
});

// change user image
// api/v1/users/:userId/profile-image
router.put('/:userId/profile-image', upload.single('userImage'), (request, response) => {

        // find the user that will have the information updated
    User.findOne({ _id: request.params.userId }).then(dbResponse => {

        //specify the image that will be uploaded and where it will be saved in Cloudinary
        const imageData = uploadFiles(request.file.path, `Connectify/${ dbResponse.userType }/${request.params.userId}/Profile Images`).then(data => {
            
            User.updateOne(
                { _id : request.params.userId },
                { 
                    $push: {
                        image: {
                            $each: [{
                                url: data.url, // image url from cloudinary
                                public_id: data.public_id // unique id of the image
                            }],
                            $position: 0
                        },
                    }
                }
            )
            .then(dbResponse => {
                response.status( 200 ).send({ message: 'Upload Success' });
            })
            .catch((error) => {
                response.status( 500 ).send({ message: 'Server Error' });
            })
        })

    })
});

// add/remove products
// api/v1/users/:userId/product-list
router.put('/:userId/product-list', (request, response) => {
    const userId = request.params.userId;
    const {
        type,
        product
    } = request.body;
    let value;

    //will add the product to the user's product list
    if( type === 'add' ) {
        value = {
            $addToSet: {
                productList: {
                    productId: product.productId,
                    productName: product.productName,
                    productDescription: product.productDescription,
                    productPrice: product.productPrice,
                    productImage: product.productImage,
                }
            }
        }
    }

    //will remove the product to the user's product list
    else if( type === 'remove' ) {
        value = {
            $pull: {
                productList: {
                    productId: product.productId
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
        response.status( 200 ).send({ message: 'Success' });
    })
    .catch((error) => {
        response.status( 500 ).send({ message: 'Server Error' });
    });
});

// change user's product info
// api/v1/users/:userId/:productId
router.put('/:userId/:productId', (request, response) => {
    const { userId, productId } = request.params;
    const {
        productName,
        productDescription,
        productPrice
    } = request.body;
    
    //update the product in the user's product list
    User.updateOne( 
        { _id: userId, 'productList.productId': productId },
        {
            $set: {
                'productList.$.productName': productName,
                'productList.$.productPrice': productPrice,
                'productList.$.productDescription': productDescription
            }
        }
    )
    .then( dbResponse => {
        response.status( 200 ).send({ message: 'Success' });
    })
    .catch((error) => {
        response.status( 500 ).send({ message: 'Server Error' });
    });
});

// change product image
// api/v1/users/:userId/:productId/images
router.put('/:userId/:productId/images', upload.any(), (request, response) => {

    const { userId, productId } = request.params

        // find the user that will have the information updated
    User.findOne({ _id: userId }).then(dbResponse => {

        //specify the image that will be uploaded and where it will be saved in Cloudinary
        const imageData = uploadFiles(request.file.path, `Connectify/${ dbResponse.userType }/${ userId }/Product Images/${ productId }`).then(data => {
            
            User.updateOne(
                { _id: userId },
                { 
                    $push: {
                        'productList.$[updateProduct].productImage': {
                            $each: [{
                                url: data.url, // image url from cloudinary
                                public_id: data.public_id // unique id of the image
                            }],
                            $position: 0
                        },
                    }
                },
                {
                    arrayFilters: [
                        {"updateProduct.productId" : productId}
                    ]
                }
            )
            .then(dbResponse => {
                response.status( 200 ).send({ message: 'Upload Success' });
            })
            .catch((error) => {
                response.status( 500 ).send({ message: 'Server Error' });
                console.log(error)
            });
        })

    })
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
        response.status( 200 ).send({ message: 'Success' });
    })
    .catch((error) => {
        response.status( 500 ).send({ message: 'Server Error' });
    });
});

// DELETE REQUEST

// remove profile images
// api/v1/users/:userId/profile-image
router.delete('/:userId/profile-image', (request, response) => {
    const { userId } = request.params;

    // delete image in cloudinary
    removeFiles(request.body.public_id).then(() => {

        //delete the image in the database
        User.updateOne( 
            { _id: userId },
            {
                $pull: {
                    image: {
                            public_id: request.body.public_id
                        }
                    }
            }
        )
        .then( dbResponse => {
            response.status( 200 ).send({ message: 'Success' });
        })
        .catch((error) => {
            response.status( 500 ).send({ message: 'Server Error' });
        });
    })
});

// remove product images
// api/v1/users/:userId/:productId/images
router.delete('/:userId/:productId/images', (request, response) => {
    const { userId, productId} = request.params;

    // delete image in cloudinary
    removeFiles(request.body.public_id).then(() => {

        //delete the image in the database
        User.updateOne( 
            { _id: userId },
            {
                $pull: {
                    'productList.$[updateProduct].productImage': {
                        public_id: request.body.public_id
                    }
                }
            },
            {
                arrayFilters: [
                    { "updateProduct.productId" : productId }
                ]
            }
        )
        .then( dbResponse => {
            response.status( 200 ).send({ message: 'Success' });
        })
        .catch((error) => {
            response.status( 500 ).send({ message: 'Server Error' });
        });
    })
});

module.exports = router;