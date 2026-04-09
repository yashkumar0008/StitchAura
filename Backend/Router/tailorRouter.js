var tailorController = require("../Controller/tailorController");
var {validateTokenn} = require("../Config/Validatetoken");

var app=require("express");
var router=app.Router();

router.post("/profileaxios",validateTokenn,tailorController.doTailorProfile);
router.post("/updatetailoraxios",validateTokenn,tailorController.doUpdateTailor);
router.post("/findtailoraxios",validateTokenn,tailorController.doFindTailor);
router.post("/findtailorbymobile",validateTokenn,tailorController.doFindTailorByMobile);
router.post("/distinct-city",validateTokenn,tailorController.doFetchCity);
router.get("/category-dress",validateTokenn,tailorController.doFetchCategoryDress);
router.post("/tailor-data",validateTokenn,tailorController.doFetchTailorData);
router.post("/extractAadhar",validateTokenn, tailorController.extractAadhar);

module.exports=router;