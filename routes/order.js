const router = require('express').Router();
const Order = require('../models/OrderModel');
const moment = require('moment');

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

// POST REQUESTS

// add new order
// api/v1/orders/placed
router.post('/placed', (request, response) => {

    const {
        customerName,
        customerAddress,
        customerNumber,
        customerEmail,
        sellerId,
        orderedProducts,
        typeOfPayment
    } = request.body

    const newOrder    = new Order({
        customerName: customerName,
        customerAddress: customerAddress,
        customerNumber: customerNumber,
        customerEmail: customerEmail,
        sellerId: sellerId,
        orderedProducts: orderedProducts,
        typeOfPayment: typeOfPayment,
        dateOrdered: moment().format('MMM DD YYYY, h:mm:ss a'),
        status: 'Order Placed'
    });

    newOrder.save().then( data => {
        response.status( 201 ).send({  message: "Order created" });
    });
});
    
module.exports = router;