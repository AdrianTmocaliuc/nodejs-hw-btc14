const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { generateError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generateError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 7);

  const result = await User.create({
    ...req.body,
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
