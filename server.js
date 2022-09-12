const express = require("express");

const app = express();
const PORT = 5000;
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("database is connect");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
  console.log("sssssssss");
});
