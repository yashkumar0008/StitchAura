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
    from: '"Stitch Aura" <yourgmail@gmail.com>',
    to: emailid,
    subject: "Verify Your Email - Stitch Aura",
    html: `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      
      <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px; text-align:center;">
        
        <h2 style="color:#333;">Welcome to Stitch Aura 👋</h2>
        
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

async function sendOtpForReset(req, resp) {
  const { emailid } = req.body;
  
  const user = await UserColRef.findOne({ emailid });

  if (!user) {
    return resp.json({ status: false, msg: "Email not registered" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;

  await user.save();

  try {
    await transporter.sendMail({
      from: '"Stitch Aura" <yourgmail@gmail.com>',
      to: emailid,
      subject: "Password Reset OTP",
      html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
  <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <h2 style="color: #333;">Password Reset Request</h2>
    
    <p style="color: #555; font-size: 16px;">
      We received a request to reset your password. Use the OTP below to proceed:
    </p>

    <div style="margin: 20px 0;">
      <span style="
        display: inline-block;
        padding: 15px 25px;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 4px;
        background-color: #000;
        color: #fff;
        border-radius: 8px;
      ">
        ${otp}
      </span>
    </div>

    <p style="color: #777; font-size: 14px;">
      This OTP is valid for 5 minutes.
    </p>

    <hr style="margin: 25px 0;" />

    <p style="font-size: 12px; color: #999;">
      If you did not request a password reset, please ignore this email.
    </p>

  </div>
</div>
`
    });

    resp.json({ status: true, msg: "OTP sent to email" });
  } catch (err) {
    resp.json({ status: false, msg: "Email not sent" });
  }
}

async function resetPassword(req, resp) {

  try {
    const { emailid, otp, pwd } = req.body;

    const user = await UserColRef.findOne({ emailid });

    if (!user) {
      return resp.json({ status: false, msg: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return resp.json({ status: false, msg: "Invalid or expired OTP" });
    }

    user.pwd = pwd;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    resp.json({ status: true, msg: "Password reset successful" });
  } catch (err) {
    resp.json({ status: false, msg: err.message });
  }

}

async function verifyResetOtp(req, resp) {
  const { emailid, otp } = req.body;

  const user = await UserColRef.findOne({ emailid });

  if (!user) {
    return resp.json({ status: false, msg: "User not found" });
  }

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return resp.json({ status: false, msg: "Invalid or expired OTP" });
  }

  user.isOtpVerified = true;
  await user.save();

  resp.json({ status: true, msg: "OTP verified" });
}


module.exports = { doSignup, doLogin, verifyOtp, sendOtpForReset, resetPassword, verifyResetOtp };