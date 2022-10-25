const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const { json, urlencoded } = require("body-parser");
const {
  userRouter,
  characterRouter,
  partyRouter,
  campaignRouter,
} = require("./routers/index");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "D&D Companion Tool API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Local development server",
    },
  ],
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.js"],
});

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req, res) =>
  res.json(openapiSpecification).status(200)
);

app.use("/users", userRouter);
app.use("/characters", characterRouter);
app.use("/parties", partyRouter);
app.use("/campaigns", campaignRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
