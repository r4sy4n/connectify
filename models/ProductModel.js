const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    stock: Number,
    catalog: String,

    variation: {
        type: [String],
        default: []
    },

    sellers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Seller',
        default: []
    }
});

module.exports = mongoose.model( 'Product', ProductSchema );