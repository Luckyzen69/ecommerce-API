const mongoose = require('mongoose');
// const { boolean } = require('webidl-conversions');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
 title: {
    type: String,
    required: true,
 },
 price: {
    type: Number,
    default: 0, 
    min:0
     },
     discription:{
      type:String,
      maxLength: 255 
     },
     creatdBy:{
      require: true,
      type:ObjectId,
      ref:"User"
     },
     image:{
      type: String // we save image in some direcity and only save image path
     }
 });
 
const ProductModel = mongoose.model("product",ProductSchema)


module.exports = ProductModel