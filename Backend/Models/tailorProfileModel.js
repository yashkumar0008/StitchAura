var mongoose = require("mongoose");

let ColDesign = {
    emailid: { type: String, required: true, index: true, unique: true },
    name: String,
    contact: String,
    address: String,
    city: String,
    aadharno: String,
    dob: String,
    category: String,
    speciality: String,
    social: String,
    since: Number,
    worktype: String,
    shopaddress: String,
    shopcity: String,
    otherinfo: String,
    profilepic: String,
    aadharFront: String,
    aadharBack: String,
}
var ver = {
    versionKey: false,

}
let SchemaClass = mongoose.Schema;
let collectionObj = new SchemaClass(ColDesign, ver);
let UserColRef = mongoose.model("TailorProfile", collectionObj);

module.exports = UserColRef;