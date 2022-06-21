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
    throw generateError(401, "Email or passwo   rd is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;

// const payload = {
//   td: "62b09563b1d82f62d14a0e56",
// };

// const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
// // console.log("token: ", token);
// const decodeToken = jwt.decode(token);
// // console.log(decodeToken);

// try {
//   const verifyToken = jwt.verify(token, SECRET_KEY);
//   console.log(verifyToken);
// } catch (error) {
//   console.log(error.message);
// }
