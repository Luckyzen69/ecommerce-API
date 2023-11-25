const express = require('express')
const router = express.Router()
// const UserModel = require("../model/User")
const auth = require("../controller/auth")
const {login,signup} = require("../controller/auth")
const {fetchProduct,createProduct} = require("../controller/product")


 router.post('/api/signup',signup)
 router.post('/api/login',login)

  module.exports = router;