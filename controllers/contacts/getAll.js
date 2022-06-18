const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(201).json(result);
};

module.exports = getAll;
