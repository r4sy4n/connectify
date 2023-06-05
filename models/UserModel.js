const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String},
    password: {type: String, required: true, select: false},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    image: [{
        url: String,
        public_id: String,
        _id: false
    }],
    shopName: String,
    shopURL: String,
    shopLogo: String,
    productList: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        productName: String,
        productDescription: String,
        productPrice: Number,
        productImage: [{
            url: String,
            public_id: String,
            _id: false
        }],
        _id: false
    }],
    orderList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
    }],
    userType: String,
});

module.exports = mongoose.model( 'User', UserSchema );