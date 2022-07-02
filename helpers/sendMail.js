const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRYD_API_KEY } = process.env;
sgMail.setApiKey(SENDGRYD_API_KEY);

const mail = {
  to: "rivek43387@weepm.com",
  from: "ieroglifr.per@gmail.com",
  subject: "New letter from site",
  html: "<p>New letter from site</p>",
};

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "ieroglifr.per@gmail.com" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;

// sgMail
//   .send(mail)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
