const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel');
const { error } = require('console');


// GET Endpoints

// Display all products
// /api/v1/products
router.get( '/', ( request, response ) => {
    Product.find().then(dbResponse => {
        response.status( 200 ).send( { products: dbResponse });
    })
});

// Display product by id
router.get( '/:productId', ( request, response ) => {
    Product.findOne( { _id: request.params.productId } )
        .then( dbResponse => {
            if ( dbResponse ) {
                response.status( 200 ).send( { product: dbResponse } )
            }   else {
                response.status( 404 ).send( { error: 'Product not found' } )
            }    
        })
        .catch( error => {
            console.log( error )
            response.status( 500 ).send( { error: 'Server error' });
        });
});


// POST Endpoint

// Upload new product
router.post( '/', ( request, response ) => {
    const { name, price, description, stock, variation, catalog, sellers } = request.body;

    if ( !name || !price || !description || !stock ) {
        return response.status( 400 ).send( { error: 'Missing required fields' } );
    }

    if ( isNaN( price ) || isNaN( stock ) ) {
        return response.status( 400 ).send( { error: 'Invalid input' } );
    }

    const newProduct = new Product({
        name,
        price,
        description,
        stock,
        variation,
        catalog,
        sellers
    });

    newProduct.save()
        .then( savedProduct => {
            response.status( 201 ).send({ product: savedProduct, message: 'Product posted successfully' });
        })
        .catch( error => {
            console.error( error );
            response.status( 500 ).send( { error: 'Server error' });
        });

});


// PUT Endpoint

// update product by id
router.put( '/:productId', ( request, response ) => {
    const productId = request.params.productId;
    const { name, price, description, stock, variation, catalog, sellers } = request.body;

    const updatedProduct = {
        name,
        price, 
        description,
        stock,
        variation,
        catalog,
        sellers
    };

    Product.findByIdAndUpdate( productId, updatedProduct, { new: true } )
        .then( updatedProduct => {
            if ( updatedProduct ) {
                response.status( 200 ).send( { product: updatedProduct } );

            } else {
                response.status( 404 ).send( { error: 'Product not found' } );
            }
        })
        .catch( error => {
            console.error( error );
            response.status( 500 ).send({ error: 'Server error' })
        });
});


// DELETE Endpoint

// Delete product by id
router.delete( '/:productId', ( request, response ) => {
    const productId = request.params.productId;

    Product.findByIdAndRemove( productId )
        .then( deletedProduct => {
            if ( deletedProduct ) {
                response.status( 200 ).send( { message: 'Product deleted successfully' } );
            } else {
                response.status( 404 ).send( { error: 'Product not found' } );
            }
        })
        .catch( error => {
            console.error( error );
            response.status( 500 ).send( { error: 'Server error' } )
        });
});


module.exports = router