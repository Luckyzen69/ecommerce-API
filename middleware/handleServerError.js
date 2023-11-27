module.exports = (err,req,res,next)=>{
  let status =500
  let message ="Server Error"

  if(err.name == "ValidationError"){
    status = 400;
    message= "Bad Request"
  }
    res.status(status).send({
        "error":err.message,
        "msg":message,
      "errorStack":err.Stack

    })

}
