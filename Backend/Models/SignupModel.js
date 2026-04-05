var mongoose=require("mongoose");

let ColDesign= {
    emailid:{type: String ,required: true ,index: true ,unique: true},
    pwd: String,
    usertype:String,
    dos:{type:Date,default: Date.now},
    Status:{type: Boolean, default: true}
}
var ver={
    versionKey: false,

}
let SchemaClass=mongoose.Schema;
let collectionObj=new SchemaClass(ColDesign,ver);
let UserColRef=mongoose.model("AllUsers",collectionObj);

module.exports=UserColRef;