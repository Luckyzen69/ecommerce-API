const UserModel = require("../model/User")
let bcrypt = require('bcrypt')


              // sign up

  const signup = async (req,res,next)=>{
    console.log('req.body',req.body);
    try{
      let hashedPassword = await bcrypt.hash(req.body.password, 10 )
    console.log(hashedPassword);
      let user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    

      res.send(user)
    }catch(err){
      res.status(500).send({error:err.message})
    }
  }
            

   // login
  const login = async (req,res,next)=>{
    console.log('req.body',req.body);
    try{
          // check if email exist in db or not 
          let user = await UserModel.findOne({email: req.body.email})
          console.log(user);

         if(user){
           let hashedPassword = user.password //password stored in db
          let matched= await bcrypt.compare(req.body.password, hashedPassword);
          if(matched){  
            console.log("logged in");
         }
        }

          return res.status(401).send("invaid credentials")
  
        

    }catch(err){
      res.status(500).send({
        error:err.message
      })
    }
  }


  module.exports ={
    login,
    signup
  }