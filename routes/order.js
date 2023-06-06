const router = require('express').Router();
const Order = require('../models/OrderModel');

// GET REQUESTS

// show all orders
// api/v1/orders
router.get('/', (request, response) => {
    Order.find().populate('sellerId orderedProducts.productId').lean().then(dbResponse => {
        response.status( 200 ).send({ orders: dbResponse });
    });
});

//show the order using id
// api/v1/orders/:orderId
router.get('/:orderId', (request, response) => {
    Order.findOne({ _id : request.params.orderId }).populate('sellerId orderedProducts.productId').lean().then(dbResponse => {
        response.status( 200 ).send({ order: dbResponse });
    });
});

// POST REQUESTS

// add new order
// api/v1/orders/
router.post('/', (request, response) => {

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
        customerName,
        customerAddress,
        customerNumber,
        customerEmail,
        sellerId,
        orderedProducts,
        typeOfPayment,
        status: [{
            label: 'Order Placed'
        }]
    });

    newOrder.save().then( data => {
        response.status( 201 ).send({  message: "Order created", orderId: data._id });
    })
});

// PUT REQUESTS

// updates the order status
// api/v1/orders/:orderId
router.put('/:orderId', (request, response) => {
    Order.updateOne(
        { _id : request.params.orderId },
        {
            $push: {
                status: {
                    $each: [{label: request.body.label}],
                    $position: 0
                }
            }
        }
    )
    .then(dbResponse => {
        response.status( 200 ).send({ message: dbResponse });
    });
});
    
module.exports = router;