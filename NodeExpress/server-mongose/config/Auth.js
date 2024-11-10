const jwt=require('jsonwebtoken')
const validateToken=(req,res,next)=>{
    const secretekey= '0987654321'
    const token=req.headers.autherization
    console.log(token)
    if(!token){
        return res.status(401).json({message:"invalid request"})
    }
    try{
        const validate=jwt.verify(token,secretekey)
        const exp=validate.exp
        if(exp<Date.now()/1000){
            return res.status(500).json({message:'Token expired'})
        }
        next()

      
    }
    catch(error){
        return res.status(500).json({message:"Invalid Token"})

    }

}
module.exports=validateToken