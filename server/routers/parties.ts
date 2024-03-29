import { Router } from "express";
import { validation } from "../utils";
import { check } from "express-validator";
import { partyController } from "../controllers/party";

const partyRouter = Router();

/**
 * @swagger
 * /parties:
 *   get:
 *     tags: [
 *       parties
 *     ]
 *     summary: Returns an array of party items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Party One", "party_level": "3", "date_created": "00/00/00 00:00:00"},
 *                         {"id": 2, "name": "Party Two", "party_level": "5", "date_created": "00/00/00 00:00:00"}]'
 *       204:
 *         description: No content
 */
partyRouter.route("/").get(partyController.getAllParties);

/**
 * @swagger
 * /parties/{partyId}:
 *   get:
 *     tags: [
 *       parties
 *     ]
 *     summary: Returns a single party
 *     parameters:
 *       - name: partyId
 *         in: path
 *         type: integer
 *         description: The ID of the requested party.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Party One", "party_level": "3", "date_created": "00/00/00 00:00:00"}'
 *       204:
 *         description: No content
 */
partyRouter.route("/:party_id(\\d+)").get(partyController.getParty);

/**
 * @swagger
 * /parties:
 *   post:
 *     tags: [
 *       parties
 *     ]
 *     summary: Creates a new party
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the party
 *               party_level:
 *                 type: int
 *                 required: true
 *                 description: The level of the party
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Party Created
 */
partyRouter
  .route("/")
  .post(
    [
      check("party_name")
        .isLength({ min: 3 })
        .withMessage("the party name must have minimum length of 3")
        .trim(),
      check("party_level")
        .isNumeric()
        .withMessage("the parties level must be a number"),
    ],
    validation.validate,
    partyController.createParty
  );

/**
 * @swagger
 * /parties/add:
 *   post:
 *     tags: [
 *       parties
 *     ]
 *     summary: Adds a character to a party
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 party_id:
 *                  type: number
 *                  required: true
 *                  description: The id for the party
 *                character_id:
 *                 type: int
 *                 required: true
 *                 description: The level of the party
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Party Created
 */
partyRouter
  .route("/add/")
  .post(
    [
      check("party_id")
        .isNumeric()
        .withMessage("the party id has not been found")
        .trim(),
      check("character_id")
        .isNumeric()
        .withMessage("the character id has not been found"),
    ],
    validation.validate,
    partyController.addToParty
  );

/**
 * @swagger
 * /parties/{partyId}:
 *   put:
 *     tags: [
 *       parties
 *     ]
 *     summary: Updates an existing party
 *     parameters:
 *       - name: partyId
 *         in: path
 *         type: integer
 *         description: The ID of the requested party.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the party
 *               party_level:
 *                 type: int
 *                 required: true
 *                 description: The level of the party
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: Party Updated
 */
partyRouter
  .route("/:party_id(\\d+)")
  .put(
    [
      check("party_name")
        .isLength({ min: 3 })
        .withMessage("the party name must have minimum length of 3")
        .trim(),
      check("party_level")
        .isNumeric()
        .withMessage("the parties level must be a number"),
    ],
    validation.validate,
    partyController.updateParty
  );

/**
 * @swagger
 * /parties/{partyId}:
 *   delete:
 *     tags: [
 *       parties
 *     ]
 *     summary: Deletes an existing party
 *     parameters:
 *       - name: partyId
 *         in: path
 *         type: integer
 *         description: The ID of the requested party.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Party Deleted
 */
partyRouter.route("/:id").delete(partyController.removeParty);

export { partyRouter };
