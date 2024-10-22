const authService=require("../service/login");
const {generateKey}=require("../../common/utils/csrfGenerate");

async function login(req,res){
    try {
        const {email,password}=req.body;
        const token=await authService.login(email,password);
        const cToken=await generateKey();
        res.cookie('csrf-token', cToken);
        res.json({token:token,csrfT:cToken});
    } catch(err){
        console.log("-------",err.message)
        res.status(401).json({message: "Invalid credentials"});
    }
}

module.exports = {
    login
}