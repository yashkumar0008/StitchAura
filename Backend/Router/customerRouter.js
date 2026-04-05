var customerController = require("../Controller/customerController");
var {validateTokenn} = require("../Config/Validatetoken");

var app=require("express");
var router=app.Router();

router.post("/profileaxios",validateTokenn,customerController.doCustomerProfile);
router.post("/findcustomeraxios",validateTokenn,customerController.doFindCustomer);
router.post("/updatecustomeraxios",validateTokenn,customerController.doUpdateCustomer);

module.exports=router;