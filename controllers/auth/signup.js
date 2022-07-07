const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
require("dotenv").config();

const { User } = require("../../models/user");
const { generateError, sendMail } = require("../../helpers");
const { PORT = 3000 } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generateError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 7);

  const verificationToken = v4();
  const result = await User.create({
    ...req.body,
    verificationToken,
    password: hashPassword,
  });

  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target='_blank' href='http://localhost:${PORT}/api/users/verify/${verificationToken}'> Click to confirm your email </a>`,
  };

  await sendMail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
