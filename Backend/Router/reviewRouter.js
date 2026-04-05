var reviewController = require("../Controller/reviewController");

var app=require("express");
var router=app.Router();

router.post("/addreview",reviewController.doSaveReview);



module.exports=router;