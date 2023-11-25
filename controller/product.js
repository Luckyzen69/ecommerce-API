
const ProductModal = require('../model/Product')

 const fetchProduct = async function (req,res){
    let product = await ProductModal.find()
    res.send(product)
  }
             function checkAuthentication(req,res,next){
                let loggedIn = false;
                if(!loggedIn){
                    res.status(404).send("unathuntication")
                }

             }


const createProduct = async function (req,res,next){
    console.log('req.body',req.body);
    try{
        let product =  await ProductModal.create({
            title: req.body.title,
            price: req.body.price
        })
        res.send(product)
    }
    catch(err){
        res.status(404).send({error: err.message})
        next();
    }
  }
 module.exports ={
    fetchProduct,
    createProduct
 }