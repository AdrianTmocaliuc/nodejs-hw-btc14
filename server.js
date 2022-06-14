require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT } = process.env;

//hw03-mongodb
// const DB_HOST =
//   "mongodb+srv://hw03-mongodb:IPOTbZ76Bqm4IobF@cluster0.ll9dl.mongodb.net/hw03-mongodb?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect success"))
  .catch((error) => console.log(error.message));

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
