const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");

const {
    getAllCampaigns,
    getCampaign,  
    getCampaignByName,
    createCampaign, 
    updateCampaign, 
    removeCampaign,
} = require("../controllers/campaign");

/**
 * @swagger
 * /campaigns:
 *   get:
 *     tags: [
 *       campaigns
 *     ]
 *     summary: Returns an array of campaign items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Campaign 1", "description": "A description", "date_created": "00/00/00 00:00:00"},
 *                         {"id": 2, "name": "Campaign 2", "description": "Another description", "date_created": "00/00/00 00:00:00"}]'
 *       204:
 *         description: No content
 */
router.route("/").get(getAllCampaigns);

/**
 * @swagger
 * /campaigns/{campaignId}:
 *   get:
 *     tags: [
 *       campaigns
 *     ]
 *     summary: Returns an single campaign
 *     parameters:
 *       - name: campaignId
 *         in: path
 *         type: integer
 *         description: The ID of the requested campaign.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Campaign 1", "description": "A description", "date_created": "00/00/00 00:00:00"}'
 *       204:
 *         description: No content
 */
router.route("/:campaign_id(\\d+)").get(getCampaign);

/**
 * @swagger
 * /campaigns/{name}:
 *   get:
 *     tags: [
 *       campaigns
 *     ]
 *     summary: Returns an single campaign
 *     parameters:
 *       - name: name
 *         in: path
 *         type: string
 *         description: The name of the requested campaign.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Campaign 1", "description": "A description", "date_created": "00/00/00 00:00:00"}'
 *       204:
 *         description: No content
 */
router.route("/campaign/").get(getCampaignByName);

/**
 * @swagger
 * /campaigns:
 *   post:
 *     tags: [
 *       campaigns
 *     ]
 *     summary: Creates a new campaign
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the campaign
 *               description:
 *                 type: string
 *                 required: true
 *                 description: The description for the campaign
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Campaign Created
 */
router.route("/").post(
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the campaign name must have minimum length of 3")
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
  createCampaign
);

/**
 * @swagger
 * /campaigns/{campaignId}:
 *   put:
 *     tags: [
 *       campaigns
 *     ]
 *     summary: Updates an existing campaign
 *     parameters:
 *       - name: campaignId
 *         in: path
 *         type: integer
 *         description: The ID of the requested campaign.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the campaign
 *               description:
 *                 type: string
 *                 required: true
 *                 description: The description for the campaign
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: Campaign Updated
 */
router.route("/:campaign_id(\\d+)").put(
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the campaign name must have minimum length of 3")
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
  updateCampaign
);

/**
 * @swagger
 * /campaigns/{campaignId}:
 *   delete:
 *     tags: [
 *       campaigns
 *     ]
 *     summary: Deletes an existing campaign
 *     parameters:
 *       - name: campaignId
 *         in: path
 *         type: integer
 *         description: The ID of the requested campaign.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Campaign Deleted
 */
router.route("/:id").delete(removeCampaign);

module.exports = router;
 