const signup = require("./signup");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  signup,
  verifyEmail,
  resendVerifyEmail,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
};
