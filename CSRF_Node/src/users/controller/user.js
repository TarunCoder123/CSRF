const userService=require("../service/user");

async function getUsers(req,res){
    try{
        const { name }=req.query;
        console.log("controller name",name);
        const users=await userService.getUsers(name);
        res.json({users})
    } catch(error){
        res.status(500).json({message:error})
    }
}

module.exports={ getUsers }

/**
  Service me bussiness logic (kya kaam kar wana hai )
  Controller 
 */