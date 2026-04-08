var express = require("express");
require('dotenv').config();
var fileuploader = require("express-fileupload");
var cors = require("cors");

var {connectToMongoDB}=require("./Config/DbConnect");

var userRouter = require("./Router/UserRouter");
var customerRouter = require("./Router/customerRouter");
var tailorRouter = require("./Router/tailorRouter");
var reviewRouter = require("./Router/reviewRouter");


var app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(fileuploader());


connectToMongoDB();

app.use("/user",userRouter);
app.use("/customer",customerRouter);
app.use("/tailor",tailorRouter);
app.use("/review",reviewRouter);

app.use((req,res) => {
    res.status(404).send("Invalid URL");
});

app.get('/', (req, res) => res.json({ message: 'invalid url' }));

const PORT = process.env.PORT || 2007;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
