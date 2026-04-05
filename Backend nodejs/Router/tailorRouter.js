var tailorController = require("../Controller/tailorController");
var {validateTokenn} = require("../Config/Validatetoken");

var app=require("express");
var router=app.Router();

router.post("/profileaxios",tailorController.doTailorProfile);
router.post("/updatetailoraxios",tailorController.doUpdateTailor);
router.post("/findtailoraxios",tailorController.doFindTailor);
router.post("/findtailorbymobile",tailorController.doFindTailorByMobile);
router.post("/distinct-city",tailorController.doFetchCity);
router.get("/category-dress",tailorController.doFetchCategoryDress);
router.post("/tailor-data",tailorController.doFetchTailorData);

module.exports=router;