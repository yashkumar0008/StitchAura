var UserColRef = require("../Models/reviewModel");


async function doSaveReview(req,resp) {

  let objUserColRef = new UserColRef(req.body);
  await objUserColRef.save().then(() => {
    resp.json({ status: true, msg: "Submit Review Successfully" });
  }).catch((err) => {
    resp.status(200).json({ status: false, msg: err.message });
  });
}

module.exports = { doSaveReview }