const User=require("../../common/models/user");

async function getUsers(name){
    console.log("name service",name);
    try{
    const query=name?{name}:{};
    console.log(query);
    const users=await User.find(query);
    console.log("users",users);
    return users;
    } catch(Err){
        console.error(Err);
    }
}

async function deleteUserByName(name) {
    try {
      if (!name) throw new Error("Name is required");
  
      const result = await User.findOneAndDelete({ name });
      if (!result) {
        throw new Error(`User with name ${name} not found`);
      }
      console.log(`User ${name} deleted successfully`);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

module.exports={
    getUsers,
    deleteUserByName,
};
