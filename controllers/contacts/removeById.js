const { Contact } = require("../../models");
// const contacts = require("../../models");

const { generateError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw generateError(404);
  }
  res.json({ message: "Contact deleted" });
};

module.exports = removeById;
