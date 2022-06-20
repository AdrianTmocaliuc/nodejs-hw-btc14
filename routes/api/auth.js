const express = require("express");

const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");

/*
1. Registration
2. Authentication
3. Get current User
4. Logout
*/

router.post("/register", ctrlWrapper(ctrl.register));

module.exports = router;
