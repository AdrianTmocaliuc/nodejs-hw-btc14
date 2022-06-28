const express = require("express");
const router = express.Router();

const { uploadAvatars } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { images: ctrl } = require("../../controllers");

router.post(
  "/avatars",
  uploadAvatars.single("image"),
  ctrlWrapper(ctrl.saveAvatars)
);

module.exports = router;
