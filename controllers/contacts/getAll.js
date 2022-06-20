const { Contact } = require("../../models/contact");
const { generateError } = require("../../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  if (!result) {
    throw generateError(404, "missing field favorite");
  }
  res.status(201).json(result);
};

module.exports = getAll;
