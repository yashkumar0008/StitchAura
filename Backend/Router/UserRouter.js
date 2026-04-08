var userController = require("../Controller/userController");

var app=require("express");
var router=app.Router();


router.post("/signup",userController.doSignup);
router.post("/login",userController.doLogin);
router.post("/verify-otp", userController.verifyOtp);

module.exports=router;