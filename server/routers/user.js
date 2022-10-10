const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");

const {
    getUser,
    getUserByEmail, 
    getUsers, 
    createUser, 
    updateUser, 
    removeUser
} = require("../controllers/user");
const {  } = require("../services/users");

router.route("/").get(getUsers);
router.route("/:user_id(\\d+)").get(getUser);
router.route("/email/").get(getUserByEmail);
router.route("/").post(
  [
    check("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .trim(),
    check("forename")
      .isLength({ min: 3 })
      .withMessage("the first name must have minimum length of 3")
      .trim(),
    check("surname")
      .isLength({ min: 3 })
      .withMessage("the last name must have minimum length of 3")
      .trim(),
    check("date_created")
      .isISO8601()
      .toDate()
      .withMessage("the value is not a valid ISO8601 date"),
  ],
  (req, res, next) => {
    const error = validationResult(req);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(400).json({ error: error.array() });
    } else {
      next();
    }
  },
  createUser
);
router.route("/:user_id(\\d+)").put(
  [
    check("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .trim(),
    check("forename")
      .isLength({ min: 3 })
      .withMessage("the first name must have minimum length of 3")
      .trim(),
    check("surname")
      .isLength({ min: 3 })
      .withMessage("the last name must have minimum length of 3")
      .trim(),
    check("date_created")
      .isISO8601()
      .toDate()
      .withMessage("the value is not a valid ISO8601 date"),
  ],
  (req, res, next) => {
    const error = validationResult(req);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(400).json({ error: error.array() });
    } else {
      next();
    }
  },
  updateUser
);
//router.route("/character/:character_id").get(getCharacters);
router.route("/:id").delete(removeUser);

module.exports = router;
