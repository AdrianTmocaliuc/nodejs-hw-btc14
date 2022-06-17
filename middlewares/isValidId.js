const { isValidObjectId } = require("mongoose");
const { generateError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(generateError(400, "Not id"));
    return;
  }
  next();
};

module.exports = isValidId;
