const mongoose = require("mongoose");
require("dotenv").config();
const { DB_URI } = require("./config/config.js");

const URI = `${DB_URI}`;

//DATABASE connection
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("[DB] is connected"));
