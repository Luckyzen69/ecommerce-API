const mongoose = require('mongoose');
// const { boolean } = require('webidl-conversions');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
 title: {
    type: String,
    required: true,
 },
 price: {
    type: Number,
    default: 0, 
     }
 });
 
const ProductModel = mongoose.model("product",ProductSchema)


module.exports = ProductModel