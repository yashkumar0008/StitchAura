var userController = require("../Controller/userController");

var app=require("express");
var router=app.Router();


router.post("/signupaxios",userController.doSignup);
router.post("/loginaxios",userController.doLogin);

module.exports=router;