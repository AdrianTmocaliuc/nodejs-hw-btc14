const { Contact } = require("../../models");

// const contacts = require("../../models");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(201).json(result);
  // const result = await contacts.listContacts();
  // res.json(result);
};

module.exports = getAll;
