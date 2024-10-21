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

module.exports={
    getUsers
};
