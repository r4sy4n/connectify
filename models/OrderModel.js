const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customerName: String,
    customerAddress: String,
    customerNumber: String,
    customerEmail: String,
    sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },
    orderedProducts: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: Number,
        _id: false
    }],
    typeOfPayment: String,
    dateOrdered: String,
    status: String
});

module.exports = mongoose.model( 'Order', OrderSchema );