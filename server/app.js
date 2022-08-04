const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const { userRouter } = require("./routers/index");

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/user", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
