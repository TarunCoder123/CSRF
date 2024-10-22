const express=require("express");
const cors=require("cors");
const userController=require("../controller/user");
const authMiddleware=require("../../common/utils/authMiddleware");

const router=express.Router();

router.use(cors());

router.get("/users",authMiddleware.authenticateToken,userController.getUsers);

router.delete("/delete/:name", userController.deleteUser);

module.exports=router;