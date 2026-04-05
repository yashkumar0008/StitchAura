var mongoose=require("mongoose");

let ColDesign= {
    mobile: String,
    star: Number,
    review: String
}
var ver={
    versionKey: false,

}
let SchemaClass=mongoose.Schema;
let collectionObj=new SchemaClass(ColDesign,ver);
let UserColRef=mongoose.model("ReviewTailor",collectionObj);

module.exports=UserColRef;