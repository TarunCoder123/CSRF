const jwt=require("jsonwebtoken");
const {secretKey}=require("../configuration/jwtConfig");
// console.log("secretKey:::",secretKey)

function authenticateToken(req,res,next){
   const authHeader=req.header("Authorization");
   if(!authHeader){
    return res.status(401).json({message:"Unathorized: Missing token!"});
   }
   const [bearer,token]=authHeader.split(' ');
   if(bearer!='Bearer' || !token){
      return res.status(401).json({message: "Unathorized: Invalid token format"});
   }
// console.log("token::::",token)
   jwt.verify(token,secretKey,(err,user)=>{
    if(err){
        // console.log("error::::",err)
        return res.status(403).json({message:" Forbidden: Invalid Token"})
    }
    req.user=user;
    next();
   })
}

module.exports={ authenticateToken };