const express = require('express')
const app = express()
const cors = require('cors')
// const Product = require("./ProductModals")
// const UserModel = require("./model/User")
// const {signup,login} = require("./routes/auth")
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/product")
const handleSeverError = require("./middleware/handleServerError")
const fileUpload = require("express-fileupload")
const mongoose = require('mongoose');
      
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

app.use(cors())// global middleware
app.use(express.json())
app.use(fileUpload());
// const {fetchSignUp,CreateSignUp} = require("./signup")


app.use(authRoutes)
app.use(productRoutes)
app.use(handleSeverError)

app.use((req, res, next) => {
  res.status(400).send('server error from front');
  console.log(err);
  // next();
})
app.use((err,req, res, next) => {
  res.status(500).send('server error from back');
  console.log(err);
  // next();
})

app.listen(8000, () => {
  console.log("server started");
})
