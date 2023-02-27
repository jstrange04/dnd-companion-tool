import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { json, urlencoded } from 'body-parser';
import {
  authRouter,
  userRouter,
  characterRouter,
  partyRouter,
  campaignRouter,
} from './routers/index';
import { verifyToken } from './middleware/auth';

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
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access these api endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
);

app.get('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }

  res.status(200).send(data);
});

app.all("*", verifyToken);
// // Use middleware to set the default Content-Type
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/characters", characterRouter);
app.use("/parties", partyRouter);
app.use("/campaigns", campaignRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(err);
});

export { app };
