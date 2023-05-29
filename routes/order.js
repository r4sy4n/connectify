const router = require('express').Router();
const Order = require('../models/OrderModel');

// GET REQUESTS

// show all orders
// api/v1/orders
router.get('/', (request, response) => {
    Order.find().then(dbResponse => {
        response.status( 200 ).send({ orders: dbResponse });
    });
});

//show the order using id
// api/v1/orders/:orderId
router.get('/:orderId', (request, response) => {
    Order.find({ _id : request.params.orderId }).then(dbResponse => {
        response.status( 200 ).send({ orders: dbResponse });
    });
});
    
module.exports = router;