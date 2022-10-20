const { Router } = require("express");
const router = Router();
const { validation } = require("../utils");
const { check } = require("express-validator");

const {
  getAllCharacters,
  getCharacter,
  getCharacterByName,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../services/characters");

/**
 * @swagger
 * /characters:
 *   get:
 *     tags: [
 *       characters
 *     ]
 *     summary: Returns an array of character items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1,
 *                            "name": "Character One",
 *                            "race": "Elf"
 *                            "class": "Fighter",
 *                            "subclass": "Champion",
 *                            "level": "5",
 *                            "strength": "15",
 *                            "dexterity": "14",
 *                            "constitution": "13",
 *                            "intelligence": "12",
 *                            "wisdom": "11",
 *                            "charisma": "10",
 *                            "constitution": "13",
 *                            "hit_points": "25",
 *                            "armor_class": "13",
 *                            "movement_speed": "30" },
 *                           {"id": 2,
 *                            "name": "Character Two",
 *                            "race": "Human"
 *                            "class":"Rogue",
 *                            "subclass": "Assassin",
 *                            "level": "5",
 *                            "strength": "15",
 *                            "dexterity": "14",
 *                            "constitution": "13",
 *                            "intelligence": "12",
 *                            "wisdom": "11",
 *                            "charisma": "10",
 *                            "constitution": "13",
 *                            "hit_points": "25",
 *                            "armor_class": "13",
 *                            "movement_speed": "30" }]'
 *       204:
 *         description: No content
 */
router.route("/").get(getAllCharacters);

/**
 * @swagger
 * /characters/{characterId}:
 *   get:
 *     tags: [
 *       characters
 *     ]
 *     summary: Returns a single character
 *     parameters:
 *       - name: characterId
 *         in: path
 *         type: integer
 *         description: The ID of the requested character.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1,
 *                            "name": "Character One",
 *                            "race": "Elf"
 *                            "class": "Fighter",
 *                            "subclass": "Champion",
 *                            "level": "5",
 *                            "strength": "15",
 *                            "dexterity": "14",
 *                            "constitution": "13",
 *                            "intelligence": "12",
 *                            "wisdom": "11",
 *                            "charisma": "10",
 *                            "constitution": "13",
 *                            "hit_points": "25",
 *                            "armor_class": "13",
 *                            "movement_speed": "30"}'
 *       204:
 *         description: No content
 */
router.route("/:character_id(\\d+)").get(getCharacter);

/**
 * @swagger
 * /characters/{name}:
 *   get:
 *     tags: [
 *       characters
 *     ]
 *     summary: Returns a single character
 *     parameters:
 *       - name: name
 *         in: path
 *         type: string
 *         description: The name of the requested character.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1,
 *                            "name": "Character One",
 *                            "race": "Elf"
 *                            "class": "Fighter",
 *                            "subclass": "Champion",
 *                            "level": "5",
 *                            "strength": "15",
 *                            "dexterity": "14",
 *                            "constitution": "13",
 *                            "intelligence": "12",
 *                            "wisdom": "11",
 *                            "charisma": "10",
 *                            "constitution": "13",
 *                            "hit_points": "25",
 *                            "armor_class": "13",
 *                            "movement_speed": "30"}'
 *       204:
 *         description: No content
 */
router.route("/name/").get(getCharacterByName);

/**
 * @swagger
 * /characters:
 *   post:
 *     tags: [
 *       characters
 *     ]
 *     summary: Creates a new character
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the character
 *               race:
 *                 type: string
 *                 required: true
 *                 description: The race for the character
 *               class:
 *                 type: string
 *                 required: true
 *                 description: The class for the character
 *               subclass:
 *                 type: string
 *                 required: false
 *                 description: The subclass for the character
 *               level:
 *                 type: int
 *                 required: true
 *                 description: The level for the character
 *               strength:
 *                 type: int
 *                 required: true
 *                 description: The strength for the character
 *               dexterity:
 *                 type: int
 *                 required: true
 *                 description: The dexterity for the character
 *               constitution:
 *                 type: int
 *                 required: true
 *                 description: The constitution for the character
 *               intelligence:
 *                 type: int
 *                 required: true
 *                 description: The intelligence for the character
 *               wisdom:
 *                 type: int
 *                 required: true
 *                 description: The wisdom for the character
 *               charisma:
 *                 type: int
 *                 required: true
 *                 description: The charisma for the character
 *               hit_points:
 *                 type: int
 *                 required: true
 *                 description: The hit points for the character
 *               armor_class:
 *                 type: int
 *                 required: true
 *                 description: The armor class for the character
 *               movement_speed:
 *                 type: int
 *                 required: true
 *                 description: The movement speed for the character
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Character Created
 */
router
  .route("/")
  .post(
    [
      check("name")
        .isLength({ min: 3 })
        .withMessage("the character name must have minimum length of 3")
        .trim(),
      check("race")
        .isLength({ min: 3 })
        .withMessage("the character race must have minimum length of 3")
        .trim(),
      check("character_class")
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
    validation.validate,
    createCharacter
  );

/**
 * @swagger
 * /characters:
 *   post:
 *     tags: [
 *       characters
 *     ]
 *     summary: Updates an existing character
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the character
 *               race:
 *                 type: string
 *                 required: true
 *                 description: The race for the character
 *               class:
 *                 type: string
 *                 required: true
 *                 description: The class for the character
 *               subclass:
 *                 type: string
 *                 required: false
 *                 description: The subclass for the character
 *               level:
 *                 type: int
 *                 required: true
 *                 description: The level for the character
 *               strength:
 *                 type: int
 *                 required: true
 *                 description: The strength for the character
 *               dexterity:
 *                 type: int
 *                 required: true
 *                 description: The dexterity for the character
 *               constitution:
 *                 type: int
 *                 required: true
 *                 description: The constitution for the character
 *               intelligence:
 *                 type: int
 *                 required: true
 *                 description: The intelligence for the character
 *               wisdom:
 *                 type: int
 *                 required: true
 *                 description: The wisdom for the character
 *               charisma:
 *                 type: int
 *                 required: true
 *                 description: The charisma for the character
 *               hit_points:
 *                 type: int
 *                 required: true
 *                 description: The hit points for the character
 *               armor_class:
 *                 type: int
 *                 required: true
 *                 description: The armor class for the character
 *               movement_speed:
 *                 type: int
 *                 required: true
 *                 description: The movement speed for the character
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Character Updated
 */
router
  .route("/:character_id(\\d+)")
  .put(
    [
      check("name")
        .isLength({ min: 3 })
        .withMessage("the character name must have minimum length of 3")
        .trim(),
      check("race")
        .isLength({ min: 3 })
        .withMessage("the character race must have minimum length of 3")
        .trim(),
      check("character_class")
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
    validation.validate,
    updateCharacter
  );

/**
 * @swagger
 * /character/{characterId}:
 *   delete:
 *     tags: [
 *       characters
 *     ]
 *     summary: Deletes an existing character
 *     parameters:
 *       - name: characterId
 *         in: path
 *         type: integer
 *         description: The ID of the requested character.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Character Deleted
 */
router.route("/:id").delete(deleteCharacter);

module.exports = router;
