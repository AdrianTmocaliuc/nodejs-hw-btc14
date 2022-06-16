const express = require("express");

const contacts = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");

const { schemas } = require("../../models");
//middlewares

contacts.get("/", ctrlWrapper(ctrl.getAll));

contacts.get("/:contactId", ctrlWrapper(ctrl.getById));

contacts.post("/", validation(schemas.verifyContact), ctrlWrapper(ctrl.add));

contacts.delete("/:contactId", ctrlWrapper(ctrl.removeById));

contacts.put(
  "/:contactId",
  validation(schemas.verifyContact),
  ctrlWrapper(ctrl.updateById)
);

module.exports = contacts;
