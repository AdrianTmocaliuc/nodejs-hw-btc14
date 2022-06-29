const bcrypt = require("bcryptjs");
// const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { generateError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generateError(409, "Email in use");
  }

  // console.log(req.body);
  const hashPassword = await bcrypt.hash(password, 7);
  // const avatarURL = gravatar.url(email);
  const result = await User.create({
    ...req.body,
    // avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
