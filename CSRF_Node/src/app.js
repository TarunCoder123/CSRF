const express=require('express');
const signupRoute=require("./users/routes/signup");
const loginRoute=require("./users/routes/login");
const userRoute=require("./users/routes/user");
const { initiDB }=require("./common/db/dbConfig");
const createAdminAccount=require("./scripts/admin");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const PORT=process.env.PORT || 5000;
// const cors = require("cors");
// const csrf = require("csurf");
const cookieParser = require("cookie-parser");

// const csrfProtection = csrf({ cookie: true });
initiDB();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


// createAdminAccount();

app.use("/user",signupRoute);
app.use("/auth",loginRoute);
app.use("/api",userRoute);

app.get("/",(req,res)=>{
    res.json("Bhai mere start ho gaya hai");
})

app.listen(PORT,()=>{
    console.log(`port is running of the host ${PORT}`);
});