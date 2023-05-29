const mongoose = require('mongoose');
const moment = require('moment');

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
    status: [{
        label: String,
        date: {
            type: String,
            default: moment().format('MMM DD YYYY, h:mm:ss a')
        },
        _id: false
    }]
});

module.exports = mongoose.model( 'Order', OrderSchema );