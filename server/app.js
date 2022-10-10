const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const { userRouter,
        characterRouter,
        partyRouter, 
        campaignRouter } = require("./routers/index");

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/character", characterRouter);
app.use("/party", partyRouter);
app.use("/campaign", campaignRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
