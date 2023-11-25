const express = require('express')
const router = express.Router()
const UserModel = require("../model/User")
const auth = require("../controller/auth")

const {fetchProduct,createProduct} = require("../controller/product")

router.get('/api/products',fetchProduct)
router.post('/api/products',createProduct) 

module.exports = router;