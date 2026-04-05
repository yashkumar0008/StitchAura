var path = require("path");
var cloudinary = require("cloudinary").v2;
var UserColRef = require("../Models/customerProfileModel");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.process.API_KEY,
    api_secret: process.env.API_SECRET
});


async function doCustomerProfile(req, resp) {

    let fileName = "nopic.jpg";

    if (req.files != null) {
        fileName = req.files.profilepic.name;
        let uploadFolderPath = path.join(__dirname,"..","uploads",fileName);

        await req.files.profilepic.mv(uploadFolderPath);

        let result = await cloudinary.uploader.upload(uploadFolderPath);

        req.body.profilepic = result.secure_url;
    }


   let objUserColRef = new UserColRef(req.body);
  await objUserColRef.save().then(() => {
    resp.json({ status: true, msg: "Record Saved Successfully" });
  }).catch((err) => {
    resp.status(200).json({ status: false, msg: err.message });
  });
}

async function doUpdateCustomer(req,resp){
try {
        if (req.files && req.files.profilepic) {
            let fileName = req.files.profilepic.name;
            let uploadFolderPath = path.join(__dirname, "..", "uploads", fileName);

            await req.files.profilepic.mv(uploadFolderPath);

            let result = await cloudinary.uploader.upload(uploadFolderPath);
            req.body.profilepic = result.secure_url;
        }

        await UserColRef.updateOne(
            { emailid: req.body.emailid },
            { $set: req.body }
        ).then((doc)=>{
             resp.status(200).json({ status: true, msg: "record updated successfully", doc: doc })
  
        });
    } catch (err) {
        resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

function doFindCustomer(req, resp) {

    UserColRef.findOne({ emailid: req.body.emailid })
        .then((doc) => {

            if (!doc) {
                resp.status(200).json({
                    status: false,
                    msg: "Record not found"
                });
            } else {
                resp.status(200).json({
                    status: true,
                    doc: doc
                });
            }

        }).catch((err) => {
            resp.status(500).json({
                status: false,
                msg: err.message
            });
        });
}

module.exports = {doCustomerProfile,doFindCustomer,doUpdateCustomer}

