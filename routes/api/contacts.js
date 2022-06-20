const express = require("express");

const contacts = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");
//middlewares )

contacts.get("/", ctrlWrapper(ctrl.getAll));

contacts.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

contacts.post("/", validation(schemas.verifyContact), ctrlWrapper(ctrl.add));

contacts.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

contacts.put(
  "/:contactId",
  isValidId,
  validation(schemas.verifyContact),
  ctrlWrapper(ctrl.updateById)
);

contacts.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = contacts;
