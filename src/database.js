const mongoose = require("mongoose");
require("dotenv").config();
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = require("./config/config.js");

const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

//DATABASE connection
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("[DB] is connected"))
  .catch((error) => console.error(error));
