var reviewController = require("../Controller/reviewController");
var {validateTokenn} = require("../Config/Validatetoken");

var app=require("express");
var router=app.Router();

router.post("/addreview",validateTokenn,reviewController.doSaveReview);



module.exports=router;