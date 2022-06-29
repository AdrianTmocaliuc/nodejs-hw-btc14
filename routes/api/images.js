const express = require("express");
const router = express.Router();

const { auth, uploadAvatars } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { images: ctrl } = require("../../controllers");

router.post(
  "/avatars",
  auth,
  uploadAvatars.single("image"),
  ctrlWrapper(ctrl.saveAvatars)
);

module.exports = router;
