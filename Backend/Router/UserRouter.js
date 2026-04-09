var userController = require("../Controller/userController");

var app=require("express");
var router=app.Router();


router.post("/signup",userController.doSignup);
router.post("/login",userController.doLogin);
router.post("/verify-otp",userController.verifyOtp);
router.post("/send-otp-reset", userController.sendOtpForReset);
router.post("/verify-reset-otp", userController.verifyResetOtp);
router.post("/reset-password", userController.resetPassword);

module.exports=router;