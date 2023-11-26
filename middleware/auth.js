function checkAuthentication(req,res,next){
    let loggedIn= false;
   if(!loggedIn){
    res.status(401).send("unauthenticated")
   }
   console.log("here");
   next();
}
module.exports =    {
    checkAuthentication
}