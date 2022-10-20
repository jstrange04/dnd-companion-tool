const { Router } = require("express");
const router = Router();
const { validation } = require("../utils");
const { check } = require("express-validator");

const {
  getAllParties,
  getParty,
  createParty,
  updateParty,
  removeParty,
} = require("../controllers/party");

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
router.route("/").get(getAllParties);

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
router.route("/:party_id(\\d+)").get(getParty);

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
router
  .route("/")
  .post(
    [
      check("name")
        .isLength({ min: 3 })
        .withMessage("the party name must have minimum length of 3")
        .trim(),
      check("party_level")
        .isNumeric()
        .withMessage("the parties level must be a number"),
      check("date_created")
        .isISO8601()
        .toDate()
        .withMessage("the value is not a valid ISO8601 date"),
    ],
    validation.validate,
    createParty
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
router
  .route("/:party_id(\\d+)")
  .put(
    [
      check("name")
        .isLength({ min: 3 })
        .withMessage("the party name must have minimum length of 3")
        .trim(),
      check("party_level")
        .isNumeric()
        .withMessage("the parties level must be a number"),
      check("date_created")
        .isISO8601()
        .toDate()
        .withMessage("the value is not a valid ISO8601 date"),
    ],
    validation.validate,
    updateParty
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
router.route("/:id").delete(removeParty);

module.exports = router;
