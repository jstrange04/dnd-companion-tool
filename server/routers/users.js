const { Router } = require("express");
const router = Router();
const { validation } = require("../utils");
const { check } = require("express-validator");

const {
  getAllUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  removeUser,
} = require("../controllers/user");

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of user items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "email": "email@test.com", "username": "user", "date_created": "00/00/00 00:00:00" },
 *                        { "id": 1, "email": "email@test.com", "username": "user", "date_created": "00/00/00 00:00:00" }, ]'
 *       204:
 *         description: No content
 */
router.route("/").get(getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns a single user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "email": "email@test.com", "username": "user", "password": "password", "date_created": "00/00/00 00:00:00" }'
 *       204:
 *         description: No content
 */
router.route("/:user_id(\\d+)").get(getUser);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns a single user
 *     parameters:
 *       - name: email
 *         in: path
 *         type: string
 *         description: The email of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "email": "email@test.com", "username": "user", "password": "password", "date_created": "00/00/00 00:00:00" }'
 *       204:
 *         description: No content
 */
router.route("/email/").get(getUserByEmail);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Creates a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *               username:
 *                 type: string
 *                 required: true
 *                 description: The username for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Created
 */
router.route("/").post(
  [
    check("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    check("username")
      .isLength({ min: 3 })
      .withMessage("the username must have minimum length of 3")
      .trim(),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("the password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  validation.validate,
  createUser
);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates an existing user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *               username:
 *                 type: string
 *                 required: true
 *                 description: The username for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: User Updated
 */
router
  .route("/:user_id(\\d+)")
  .put(
    [
      check("email")
        .isLength({ min: 3 })
        .isEmail()
        .withMessage("the email must have minimum length of 3")
        .trim(),
      check("username")
        .isLength({ min: 3 })
        .withMessage("the username must have minimum length of 3")
        .trim(),
      check("password")
        .isLength({ min: 8, max: 15 })
        .withMessage("the password should have min and max length between 8-15")
        .matches(/\d/)
        .withMessage("the password should have at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("the password should have at least one special character"),
    ],
    validation.validate,
    updateUser
  );

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [
 *       users
 *     ]
 *     summary: Deletes an existing user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Deleted
 */
router.route("/:id").delete(removeUser);

module.exports = router;
