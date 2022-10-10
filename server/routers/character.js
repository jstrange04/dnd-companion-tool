const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const {   getCharacters,
  getCharacter,
  getCharacterByName,
  createCharacter,
  updateCharacter,
  deleteCharacter, } = require("../services/characters");

router.route("/").get(getCharacters);
router.route("/:character_id(\\d+)").get(getCharacter);
router.route("/name/").get(getCharacterByName);
router.route("/").post(
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the character name must have minimum length of 3")
      .trim(),
    check("race")
      .isLength({ min: 3 })
      .withMessage("the character race must have minimum length of 3")
      .trim(),
    check("class")
      .isLength({ min: 3 })
      .withMessage("the character class must have minimum length of 3")
      .trim(),
    check("subclass")
      .isLength({ min: 3 })
      .withMessage("the character class must have minimum length of 3")
      .trim(),
    check("level")
      .isNumeric()
      .withMessage("the character's level must be entered"),
    check("strength")
      .isNumeric()
      .withMessage("the character's strength must be entered"),
    check("dexterity")
      .isNumeric()
      .withMessage("the character's dexterity must be entered"),
    check("constitution")
      .isNumeric()
      .withMessage("the character's constitution must be entered"),
    check("intelligence")
      .isNumeric()
      .withMessage("the character's intelligence must be entered"),
    check("wisdom")
      .isNumeric()
      .withMessage("the character's wisdom must be entered"),
    check("charisma")
      .isNumeric()
      .withMessage("the character's charisma must be entered"),
    check("hit_points")
      .isNumeric()
      .withMessage("the character's hit point total must be entered"),
    check("armor_class")
      .isNumeric()
      .withMessage("the character's armor class must be entered"),
    check("movement_speed")
      .isNumeric()
      .withMessage("the character's movement speed must be entered"),
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
  createCharacter
);
router.route("/:character_id(\\d+)").put(
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the character name must have minimum length of 3")
      .trim(),
    check("race")
      .isLength({ min: 3 })
      .withMessage("the character race must have minimum length of 3")
      .trim(),
    check("class")
      .isLength({ min: 3 })
      .withMessage("the character class must have minimum length of 3")
      .trim(),
    check("subclass")
      .isLength({ min: 3 })
      .withMessage("the character class must have minimum length of 3")
      .trim(),
    check("level")
      .isNumeric()
      .withMessage("the character's level must be entered"),
    check("strength")
      .isNumeric()
      .withMessage("the character's strength must be entered"),
    check("dexterity")
      .isNumeric()
      .withMessage("the character's dexterity must be entered"),
    check("constitution")
      .isNumeric()
      .withMessage("the character's constitution must be entered"),
    check("intelligence")
      .isNumeric()
      .withMessage("the character's intelligence must be entered"),
    check("wisdom")
      .isNumeric()
      .withMessage("the character's wisdom must be entered"),
    check("charisma")
      .isNumeric()
      .withMessage("the character's charisma must be entered"),
    check("hit_points")
      .isNumeric()
      .withMessage("the character's hit point total must be entered"),
    check("armor_class")
      .isNumeric()
      .withMessage("the character's armor class must be entered"),
    check("movement_speed")
      .isNumeric()
      .withMessage("the character's movement speed must be entered"),
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
  updateCharacter
);
router.route("/:id").delete(deleteCharacter);

module.exports = router;
