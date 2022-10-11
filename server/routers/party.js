const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");

const {
    getParty,
    getPartyByName, 
    getParties, 
    createParty, 
    updateParty, 
    removeParty
} = require("../controllers/party");
const {  } = require("../services/parties");

router.route("/").get(getParties);
router.route("/:party_id(\\d+)").get(getParty);
router.route("/party/").get(getPartyByName);
router.route("/").post(
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the party name must have minimum length of 3")
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
  createParty
);
router.route("/:party_id(\\d+)").put(
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the party name must have minimum length of 3")
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
  updateParty
);
router.route("/:id").delete(removeParty);

module.exports = router;
 