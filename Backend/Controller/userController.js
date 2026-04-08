var UserColRef = require("../Models/SignupModel");
var jwt = require("jsonwebtoken");
const transporter = require("../Config/Mail");


// async function doSignup(req, resp) {

//   const existing = await UserColRef.findOne({ emailid: req.body.emailid });
//   if (existing) {
//     return resp.status(400).json({
//       status: false,
//       msg: "Email already registered"
//     });
//   }

//   let objUserColRef = new UserColRef(req.body);
//   await objUserColRef.save().then(() => {
//     resp.json({ status: true, msg: "Signup Successfully" });
//   }).catch((err) => {
//     resp.status(500).json({ status: false, msg: err.message });
//   });
// }

async function doSignup(req, resp) {
  const { emailid } = req.body;

  const existing = await UserColRef.findOne({ emailid });
  if (existing) {
    return resp.status(400).json({
      status: false,
      msg: "Email already registered"
    });
  }

  // OTP generate
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  let objUserColRef = new UserColRef({
    ...req.body,
    otp: otp,
    otpExpiry: Date.now() + 5 * 60 * 1000 // 5 min
  });

  await objUserColRef.save();

  // Send Email
  await transporter.sendMail({
    from: '"Tailor Hub" <yourgmail@gmail.com>',
  to: emailid,
  subject: "Verify Your Email - Tailor Hub",
  html: `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      
      <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px; text-align:center;">
        
        <h2 style="color:#333;">Welcome to Tailor Hub 👋</h2>
        
        <p style="color:#555;">
          Thank you for signing up. Please use the OTP below to verify your email.
        </p>

        <div style="margin:20px 0;">
          <span style="
            display:inline-block;
            padding:10px 20px;
            font-size:24px;
            letter-spacing:3px;
            background:#000;
            color:#fff;
            border-radius:8px;
          ">
            ${otp}
          </span>
        </div>

        <p style="color:#777; font-size:14px;">
          This OTP is valid for 5 minutes.
        </p>

        <hr style="margin:20px 0;" />

        <p style="font-size:12px; color:#999;">
          If you did not create this account, please ignore this email.
        </p>

      </div>
    </div>
  `
  });

  resp.json({
    status: true,
    msg: "Signup successful, OTP sent to email"
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

    let jtoken = jwt.sign({ emailid: req.body.emailid }, process.env.SEC_KEY, { expiresIn: "10m" });

    resp.json({
      status: true,
      msg: "Login Successfully",
      usertype: user.usertype,
      token: jtoken
    });

  } catch (err) {
    resp.status(200).json({ status: false, msg: err.message });
  }
}

async function verifyOtp(req, resp) {
  const { emailid, otp } = req.body;

  const user = await UserColRef.findOne({ emailid });

  if (!user) {
    return resp.json({ status: false, msg: "User not found" });
  }

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return resp.json({ status: false, msg: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  resp.json({ status: true, msg: "Email verified successfully" });
}


module.exports = { doSignup, doLogin,verifyOtp };