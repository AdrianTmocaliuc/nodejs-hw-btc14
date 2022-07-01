const express = require("express");

const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");
const { auth, validation, uploadAvatars } = require("../../middlewares");

const { schemas } = require("../../models/user");

/*
1. Registration
2. Authentication
3. Get current User
4. Logout
*/

//register
router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.signup));

//signin
router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.current));

//signout
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

//update
router.patch(
  "/avatar",
  auth,
  uploadAvatars.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.patch(
  "/",
  auth,
  validation(schemas.updateSub),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
