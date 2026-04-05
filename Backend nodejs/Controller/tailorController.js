var path = require("path");
var cloudinary = require("cloudinary").v2;
var UserColRef = require("../Models/tailorProfileModel");

var {genAi} = require("../Config/genai")

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
    api_key: process.process.API_KEY,
    api_secret: process.env.API_SECRET
});


async function doTailorProfile(req, resp) {

    let profilePicUrl = "nopic.jpg";
    let aadharFrontUrl = "nopic.jpg";
    let aadharBackUrl = "nopic.jpg";

    if (req.files != null) {

        // ===== Profile Pic Upload =====
        if (req.files.profilepic) {
            let profileFileName = req.files.profilepic.name;
            let profileUploadPath = path.join(__dirname, "..", "uploads", profileFileName);

            await req.files.profilepic.mv(profileUploadPath);
            let profileResult = await cloudinary.uploader.upload(profileUploadPath);
            profilePicUrl = profileResult.secure_url;
        }

        // ===== Aadhar Front Pic Upload =====
        if (req.files.aadharFront) {
            let aadharFileName = req.files.aadharFront.name;
            let aadharUploadPath = path.join(__dirname, "..", "uploads", aadharFileName);

            await req.files.aadharFront.mv(aadharUploadPath);
            let aadharResult = await cloudinary.uploader.upload(aadharUploadPath);
            aadharFrontUrl = aadharResult.secure_url;

             let jsonAdhaarData= await genAi( aadharResult.secure_url);
              console.log("******************************")
              console.log(jsonAdhaarData)
              console.log("******************************")
        }

        // ===== Aadhar Front Pic Upload =====
        if (req.files.aadharBack) {
            let aadharFileName = req.files.aadharBack.name;
            let aadharUploadPath = path.join(__dirname, "..", "uploads", aadharFileName);

            await req.files.aadharBack.mv(aadharUploadPath);
            let aadharResult = await cloudinary.uploader.upload(aadharUploadPath);
            aadharBackUrl = aadharResult.secure_url;
        }

        // Save URLs in body
        req.body.profilepic = profilePicUrl;
        req.body.aadharFront = aadharFrontUrl;
        req.body.aadharBack = aadharBackUrl;
    }



    let objUserColRef = new UserColRef(req.body);
    await objUserColRef.save().then(() => {
        resp.json({ status: true, msg: "Record Saved Successfully" });
    }).catch((err) => {
        resp.status(200).json({ status: false, msg: err.message });
    });
}

async function doUpdateTailor(req, resp) {
    try {

        let existingUser = await UserColRef.findOne({ emailid: req.body.emailid });

        if (!existingUser) {
            return resp.status(404).json({
                status: false,
                msg: "User not found"
            });
        }

        let profilePicUrl = existingUser.profilepic;
        let aadharFrontUrl = existingUser.aadharFront;
        let aadharBackUrl = existingUser.aadharBack;

        if (req.files != null) {

            // ===== Profile Pic Upload =====
            if (req.files.profilepic) {
                let profileFileName = req.files.profilepic.name;
                let profileUploadPath = path.join(__dirname, "..", "uploads", profileFileName);

                await req.files.profilepic.mv(profileUploadPath);
                let profileResult = await cloudinary.uploader.upload(profileUploadPath);
                profilePicUrl = profileResult.secure_url;
            } else {
                req.body.profilepic = existingUser.profilepic;
            }

            // ===== Aadhar Front Pic Upload =====
            if (req.files.aadharFront) {
                let aadharFileName = req.files.aadharFront.name;
                let aadharUploadPath = path.join(__dirname, "..", "uploads", aadharFileName);

                await req.files.aadharFront.mv(aadharUploadPath);
                let aadharResult = await cloudinary.uploader.upload(aadharUploadPath);
                aadharFrontUrl = aadharResult.secure_url;
            } else {
                req.body.aadharFront = existingUser.aadharFront;
            }

            // ===== Aadhar Front Pic Upload =====
            if (req.files.aadharBack) {
                let aadharFileName = req.files.aadharBack.name;
                let aadharUploadPath = path.join(__dirname, "..", "uploads", aadharFileName);

                await req.files.aadharBack.mv(aadharUploadPath);
                let aadharResult = await cloudinary.uploader.upload(aadharUploadPath);
                aadharBackUrl = aadharResult.secure_url;
            } else {
                req.body.aadharBack = existingUser.aadharBack;
            }


            // Save URLs in body
        req.body.profilepic = profilePicUrl;
        req.body.aadharFront = aadharFrontUrl;
        req.body.aadharBack = aadharBackUrl;
        }

        await UserColRef.updateOne(
            { emailid: req.body.emailid },
            { $set: req.body }
        ).then((doc) => {
            resp.status(200).json({ status: true, msg: "record updated successfully", doc: doc })

        });
    } catch (err) {
        resp.status(200).json({
            status: false,
            msg: err.message
        });
    }
}

function doFindTailor(req, resp) {

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
            resp.status(200).json({
                status: false,
                msg: err.message
            });
        });
}


function doFindTailorByMobile(req, resp) {
    UserColRef.findOne({ contact: req.body.mobile })
        .then((doc) => {

            if (!doc) {
                resp.status(200).json({
                    status: false,
                    msg: "Record not found"
                });
            } else {
                resp.status(200).json({
                    status: true,
                    doc: { name: doc.name }
                });
            }

        }).catch((err) => {
            resp.status(200).json({
                status: false,
                msg: err.message
            });
        });
}





// ===================== Fetch Cities For Tailor Search ============================

async function doFetchCity(req, resp) {
    try {
        const cities = await UserColRef.distinct("shopcity");
        resp.json(cities);
    } catch (error) {
        resp.status(200).json({ message: "Error fetching cities" });
    }
}

// ===================== Fetch Category And Dress For Tailor Search ============================

async function doFetchCategoryDress(req, resp) {
    const { category } = req.query;

    try {
        let query = {};
        if (category && category !== "All") {
            query.category = category;
        }

        const specialities = await UserColRef.distinct("speciality", query);
        resp.json(specialities);
    } catch (err) {
        console.error(err);
        resp.status(200).json({ message: "Error fetching specialities" });
    }
}

// ===================== Fetch Tailor Data ============================

async function doFetchTailorData(req, res) {
    try {
        const { city, category, dress, page = 1, limit = 6 } = req.body;

        const query = {};

        // ✅ Filter by city
        if (city && city !== "") {
            query.shopcity = city;
        }

        // ✅ Filter by category
        if (category && category !== "") {
            query.category = category;
        }

        // ✅ Filter by dress / speciality
        if (dress && dress !== "") {
            query.speciality = dress;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const total = await UserColRef.countDocuments(query);

        const data = await UserColRef.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            total,
            data,
        });

    } catch (err) {
        console.log(err);
        res.status(200).json({ message: "Server Error" });
    }
}


module.exports = { doTailorProfile, doUpdateTailor, doFindTailor, doFindTailorByMobile, doFetchCity, doFetchCategoryDress, doFetchTailorData }