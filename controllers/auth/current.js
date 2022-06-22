const current = async (req, res) => {
  console.log("req.user");
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = current;
