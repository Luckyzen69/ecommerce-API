const path = require("path")

const ProductModel = require('../model/Product')

const fetchProduct = async function (err, req, res, next) {
  // let product = await ProductModal.find()
  
  let searchTerm = req.query.searchTerm || ""
  let page = parseInt(req.query.page) || 1;
  let perPage = parseInt(req.query.perPage) || 2;
  
  
  
  let sortBy = { createdAt: -1 }
                  //mongodb query opterators
                  // let filterObj = { price: { $gte: 100}}
                  // let filterObj = { price: { $lte: 100}}
     let filterObj = { $and:[
   { title: RegExp( searchTerm, "i" )},
    {price:{ $lte:priceFrom}},
    {price:{ $gte:priceTo}},
  ]}
       let reqSortBy ="titleAsc"
  if(reqSortBy =="titleAsc"){
    sortBy = { title: 1} 
  }else if(reqSortBy =="titleDesc"){
    sortBy = {title: -1}
  }
  else if(reqSortBy =="priceAsc"){
    sortBy = {title: 1}
  }
  else if(reqSortBy =="prieccDesc"){
    sortBy = {title: -1}
  }
  else if(reqSortBy =="recent"){
    sortBy = {title: 1}
  }
  else if(reqSortBy =="oldest"){
    sortBy = {title: -1}
  }
  
  try {
    let products = await ProductModel.find(filterObj)
    .populate("createdBy")
    .sort(sortBy)
    .skip((page - 1) * perPage)
    .limit(perPage)
    let total = await ProductModel.find(filterObj)
    .countDocuments()
    
    res.send({
      page,
      perPage,
      total,
      data: products
    })
    console.log(req.query);
    // res.send(product)
  }
  catch (err) {
    next(err);
  }
}





const createProduct = async function (req, res, next) {
  console.log(path.resolve());
  // req.files.image.mv()  

  console.log('req.body', req.body);
  // console.log('productc-files',req.files.image);  

  let imagePath = null

  try {
    if (req.files?.image) {
      let rootPath = path.resolve()
      let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      let tempPath = path.join("/uploads", `${uniqueSuffix}-${req.files.image.name}`)
      console.log({ tempPath })

      let destination = path.join(rootPath, tempPath)
      console.log({ destination });

      await req.files.image.mv(destination)

      imagePath = tempPath.replaceAll("\\", "/")
    }
  }
  catch (err) {
    next(err);
  }
  try {
    let product = await ProductModel.create(
      {
        ...req.body,
        createdBy: req.user._id,
        image: imagePath

      }
      // SPREAD OPERATION
      //     {
      //     title: req.body.title,
      //     price: req.body.price,
      //     discription:req.body.discription,
      //     creatdBy:req.user._id,
      // }
    )
    res.send(product)
    console.log("product created", req.user);
  }
  catch (err) {

    next(err);
  }
}

       const updateProduct =async (req,res)=>{
        console.log(req.params);
        try{
          const product = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
          res.send(product)
        }catch(err){
          next(err)
        }
       }

       const deleteProduct =async (req,res)=>{
        console.log(req.params);
        try{
          const product = await ProductModel.findByIdAnddelete(req.params.id)
          res.send(product)
        }catch(err){
          next(err)
        }
       }
module.exports = {
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}