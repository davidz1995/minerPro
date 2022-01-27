const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:false
    },
    thumbnail:{
        type:String,
        required:true
    },
    numberOfCards:{
        type:Number,
        required:true
    }
})

exports.Product = mongoose.model('Product', productsSchema)