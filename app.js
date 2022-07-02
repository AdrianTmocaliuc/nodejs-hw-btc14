const express = require("express");
const logger = require("morgan");
const cors = require("cors");
//====================
const sgMail = require("@sendgrid/mail");
//====================

require("dotenv").config();

const routers = require("./routes");

const app = express();
//====================
const { SENDGRYD_API_KEY } = process.env;
sgMail.setApiKey(SENDGRYD_API_KEY);

const mail = {
  to: "rivek43387@weepm.com",
  from: "ieroglifr.per@gmail.com",
  subject: "New letter from site",
  html: "<p>New letter from site</p>",
};

sgMail
  .send(mail)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
//====================

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", routers.auth);
app.use("/api/contacts", routers.contacts);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
