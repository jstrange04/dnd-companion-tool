import { Router } from 'express';
import { validation } from '../utils';
import { check } from 'express-validator';
import { authController } from '../controllers/auth'

const authRouter = Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     tags: [
 *       auth
 *     ]
 *     summary: Authenticates a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email address for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password of the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Authenticated
 */
 authRouter
  .route("/")
  .post(
    [
      check("email")
        .isLength({ min: 3 })
        .withMessage("the email must have minimum length of 3")
        .trim(),
      check("password")
        .isLength({ min: 8, max: 15 })
        .withMessage("your password should have min and max length between 8-15"),
    ],
    validation.validate,
    authController.authenticate
  );

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [
 *       auth
 *     ]
 *     summary: Refreshes a users JWT token
 *     responses:
 *       400:
 *         description: Bad Request.
 *       201:
 *         description: User Authentication Refreshed
 */
 authRouter.route("/refresh").post(authController.refresh);

export { authRouter };
