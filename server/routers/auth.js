const { Router } = require("express");
const router = Router();
const { validation } = require("../utils");
const { check } = require("express-validator");
const { authenticate, refresh } = require("../controllers/auth");

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
router
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
    authenticate
  );

/**
 * @swagger
 * /refresh:
 *   post:
 *     tags: [
 *       auth
 *     ]
 *     summary: Refreshes a users JWT token
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
 *         description: User Authentication Refreshed
 */
router.route("/refresh").get(refresh);

module.exports = router;
