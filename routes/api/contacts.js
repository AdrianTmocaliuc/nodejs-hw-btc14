const express = require("express");

const contacts = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");
const { auth, validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");
//middlewares )

contacts.get("/", auth, ctrlWrapper(ctrl.getAll));

contacts.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

contacts.post(
  "/",
  auth,
  validation(schemas.verifyContact),
  ctrlWrapper(ctrl.add)
);

contacts.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeById));

contacts.put(
  "/:contactId",
  auth,
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
