const { Contact } = require("../../models");

const { generateError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw generateError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;
