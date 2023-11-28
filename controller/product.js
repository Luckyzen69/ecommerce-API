
const ProductModal = require('../model/Product')

 const fetchProduct = async function (req,res){
    let product = await ProductModal.find()
    res.send(product)
  }

const createProduct = async function (req,res,next){
  console.log(path.resolve());
  req.files.image.mv()  
 
  console.log('req.body',req.body);         
  console.log('productc-files',req.files.image);  
    try{
        let product =  await ProductModal.create({...req.body,createdBy:req.user._id}
            // SPREAD OPERATION
        //     {
        //     title: req.body.title,
        //     price: req.body.price,
        //     discription:req.body.discription,
        //     creatdBy:req.user._id,
        // }
        )
      res.send(product)
        console.log("product created",req.user);
    }
    catch(err){
      
        next(err);
    }
  }
 module.exports ={
    fetchProduct,
    createProduct
 }