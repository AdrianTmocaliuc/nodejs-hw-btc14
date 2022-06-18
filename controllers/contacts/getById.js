const { Contact } = require("../../models");

const { generateError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId, "-createdAt -updatedAt");
  console.log(result);

  if (!result) {
    throw generateError(404);
  }
  res.json(result);
};

module.exports = getById;
