require("dotenv").config();

const { User } = require("../../models/user");
const { sendMail, generateError } = require("../../helpers");

const { PORT = 3000 } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  //
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw generateError(404, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target='_blank' href='http://localhost:${PORT}/api/users/verify/${user.verificationToken}'> Click to confirm your email </a>`,
  };
  sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
