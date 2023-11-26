const express = require('express')
const router = express.Router()
const UserModel = require("../model/User")
const auth = require("../controller/auth")
const {checkAuthentication} = require("../middleware/auth")

const {fetchProduct,createProduct} = require("../controller/product")


router.get('/api/products',fetchProduct)

router.post('/api/products',checkAuthentication,createProduct) 
router.post('/api/orders',checkAuthentication,(req,res)=>{
    res.send("order created")
}) 

module.exports = router;