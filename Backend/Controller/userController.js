var UserColRef = require("../Models/SignupModel");
var jwt=require("jsonwebtoken");


async function doSignup(req, resp) {

  const existing = await UserColRef.findOne({ emailid: req.body.emailid });
  if (existing) {
    return resp.status(400).json({
      status: false,
      msg: "Email already registered"
    });
  }

  let objUserColRef = new UserColRef(req.body);
  await objUserColRef.save().then(() => {
    resp.json({ status: true, msg: "Signup Successfully" });
  }).catch((err) => {
    resp.status(500).json({ status: false, msg: err.message });
  });
}

async function doLogin(req, resp) {

  try {
    const { emailid, pwd } = req.body;
    const user = await UserColRef.findOne({ emailid });


    if (!user || user.pwd !== pwd) {
      return resp.status(200).json({
        status: false,
        msg: "Invalid email or password, please try again."
      });
    }

    let jtoken=jwt.sign({emailid:req.body.emailid},process.env.SEC_KEY,{expiresIn:"10m"});

    resp.json({
      status: true,
      msg: "Login Successfully",
      usertype: user.usertype,
      token:jtoken
    });

  } catch (err) {
    resp.status(200).json({ status: false, msg: err.message });
  }
}



module.exports = { doSignup, doLogin }