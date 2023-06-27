const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    stock: Number,
    catalog: [String],

    variation: [{
        type: String,
        default: []
    }],

    sellers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        default: []
    }],
    
    image: [{
        url: String,
        public_id: String,
        _id: false
    }],
 
    isDeleted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model( 'Product', ProductSchema );