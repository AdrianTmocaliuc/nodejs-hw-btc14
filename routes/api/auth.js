const express = require("express");

const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");

const { schemas } = require("../../models/user");

/*
1. Registration
2. Authentication
3. Get current User
4. Logout
*/

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

module.exports = router;
