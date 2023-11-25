const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
});


// password encrypt hashing pasword
 
// UserSchema.pre('save',async function(next){
//   console.log("hello from inside");
//   if(this.isModified('password')){
//     this.password = 
//       next();                                                                                                            
//     });

const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel