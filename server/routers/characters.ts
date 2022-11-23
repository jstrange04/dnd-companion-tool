import { Router } from 'express';
import { validation } from '../utils';
import { check } from 'express-validator';
import { characterController } from '../controllers/character';

const characterRouter = Router();
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
 *                            "char_class": "Fighter",
 *                            "sub_class": "Champion",
 *                            "level": "5",
 *                            "strength": "15",
 *                            "dexterity": "14",
 *                            "constitution": "13",
 *                            "intelligence": "12",
 *                            "wisdom": "11",
 *                            "charisma": "10",
 *                            "constitution": "13",
 *                            "hit_points": "25",
 *                            "armour_class": "13",
 *                            "movement_speed": "30" },
 *                           {"id": 2,
 *                            "name": "Character Two",
 *                            "race": "Human"
 *                            "char_class":"Rogue",
 *                            "sub_class": "Assassin",
 *                            "level": "5",
 *                            "strength": "15",
 *                            "dexterity": "14",
 *                            "constitution": "13",
 *                            "intelligence": "12",
 *                            "wisdom": "11",
 *                            "charisma": "10",
 *                            "constitution": "13",
 *                            "hit_points": "25",
 *                            "armour_class": "13",
 *                            "movement_speed": "30" }]'
 *       204:
 *         description: No content
 */
 characterRouter.route("/").get(characterController.getAllCharacters);

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
 *                            "char_class": "Fighter",
 *                            "sub_class": "Champion",
 *                            "level": "5",
 *                            "strength": "15",
 *                            "dexterity": "14",
 *                            "constitution": "13",
 *                            "intelligence": "12",
 *                            "wisdom": "11",
 *                            "charisma": "10",
 *                            "constitution": "13",
 *                            "hit_points": "25",
 *                            "armour_class": "13",
 *                            "movement_speed": "30"}'
 *       204:
 *         description: No content
 */
 characterRouter.route("/:character_id(\\d+)").get(characterController.getCharacter);

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
 *                            "char_class": "Fighter",
 *                            "sub_class": "Champion",
 *                            "level": "5",
 *                            "strength": "15",
 *                            "dexterity": "14",
 *                            "constitution": "13",
 *                            "intelligence": "12",
 *                            "wisdom": "11",
 *                            "charisma": "10",
 *                            "constitution": "13",
 *                            "hit_points": "25",
 *                            "armour_class": "13",
 *                            "movement_speed": "30"}'
 *       204:
 *         description: No content
 */
 characterRouter.route("/name/").get(characterController.getCharacterByName);

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
 *               char_class:
 *                 type: string
 *                 required: true
 *                 description: The class for the character
 *               sub_class:
 *                 type: string
 *                 required: false
 *                 description: The sub class for the character
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
 *               armour_class:
 *                 type: int
 *                 required: true
 *                 description: The armor class for the character
 *               movement_speed:
 *                 type: int
 *                 required: true
 *                 description: The movement speed for the character,
 *               user_id:
 *                 type: int
 *                 required: true
 *                 description: The user_id of the current user creating a character 
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Character Created
 */
 characterRouter
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
      check("char_class")
        .isLength({ min: 3 })
        .withMessage("the character class must have minimum length of 3")
        .trim(),
      check("sub_class")
        .isLength({ min: 3 })
        .withMessage("the character sub class must have minimum length of 3")
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
      check("armour_class")
        .isNumeric()
        .withMessage("the character's armor class must be entered"),
      check("movement_speed")
        .isNumeric()
        .withMessage("the character's movement speed must be entered"),
    ],
    validation.validate,
    characterController.createCharacter
  );

/**
 * @swagger
 * /characters:
 *   put:
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
 *               char_class:
 *                 type: string
 *                 required: true
 *                 description: The class for the character
 *               sub_class:
 *                 type: string
 *                 required: false
 *                 description: The sub class for the character
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
 *               armour_class:
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
 characterRouter
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
      check("char_class")
        .isLength({ min: 3 })
        .withMessage("the character class must have minimum length of 3")
        .trim(),
      check("sub_class")
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
      check("armour_class")
        .isNumeric()
        .withMessage("the character's armor class must be entered"),
      check("movement_speed")
        .isNumeric()
        .withMessage("the character's movement speed must be entered"),
    ],
    validation.validate,
    characterController.updateCharacter
  );

/**
 * @swagger
 * /characters/{characterId}:
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
 characterRouter.route("/:id").delete(characterController.removeCharacter);

export { characterRouter };
