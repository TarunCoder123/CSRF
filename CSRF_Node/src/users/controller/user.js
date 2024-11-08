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

async function deleteUser(req, res) {

    try {

    const FromHeader = req.headers["X-CSRF-Token"];
    console.log("Delete request for name in header:", nameFromHeader);

    
    // const nameFromCookies = req.cookies["csrf-token"];
    // console.log(nameFromCookies,"cookies========")

    
    if (FromHeader !== FromCookies) {
      return res.status(403).json({ message: "Unauthorized: User mismatch" });
    }

      const { name } = req.params; // Get the name from URL params
      console.log("Delete request for name:", name);
      
      const deletedUser = await userService.deleteUserByName(name);
      
      res.json({ message: `User ${name} deleted successfully`, user: deletedUser });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }


module.exports={ getUsers,deleteUser }
