const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

module.exports = logout;
