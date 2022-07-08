const { Contact } = require("../../models/contact");
const { generateError } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner: _id, favorite } : { owner: _id },
    "-createdAt -updatedAt",
    {
      skip,
      limit: +limit,
      // limit: Number(limit),
    }
  ).populate("owner", "email subscription");
  if (!result) {
    throw generateError(400, "missing field favorite");
  }
  res.json(result);
};

module.exports = getAll;
