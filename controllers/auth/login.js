const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const { generateError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!user || !comparePassword) {
    throw generateError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
