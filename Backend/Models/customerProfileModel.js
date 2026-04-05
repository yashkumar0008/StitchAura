var mongoose=require("mongoose");

let ColDesign= {
    emailid:{type: String ,required: true ,index: true ,unique: true},
    name: String,
    address: String,
    city: String,
    state: String,
    gender: String,
    profilepic: String
}
var ver={
    versionKey: false,

}
let SchemaClass=mongoose.Schema;
let collectionObj=new SchemaClass(ColDesign,ver);
let UserColRef=mongoose.model("CustomerProfile",collectionObj);

module.exports=UserColRef;