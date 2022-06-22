const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  // const { subscription } = req.body;
  // console.log(subscription);
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.json(result);
};

module.exports = updateSubscription;
