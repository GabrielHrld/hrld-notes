const mongoose = require("mongoose");
require('dotenv').config();

const URI =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`; 

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
