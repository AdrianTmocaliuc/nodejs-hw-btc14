const { User } = require("../../models/user");

const { generateError } = require("../../helpers");

const verifyEmail = async (res, req) => {
  console.log(req.params);
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw generateError(404);
  }

  // console.log(verificationToken);

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
