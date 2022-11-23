import { Router } from 'express';
import { validation } from '../utils';
import { check } from 'express-validator';
import { campaignController } from '../controllers/campaign';

const campaignRouter = Router();

/*
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
campaignRouter.route("/").get(campaignController.getAllCampaigns);

/**
 * @swagger
 * /campaigns/{campaignId}:
 *   get:
 *     tags: [
 *       campaigns
 *     ]
 *     summary: Returns a single campaign
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
 campaignRouter.route("/:campaign_id(\\d+)").get(campaignController.getCampaign);

/**
 * @swagger
 * /campaigns/{name}:
 *   get:
 *     tags: [
 *       campaigns
 *     ]
 *     summary: Returns a single campaign
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
 campaignRouter.route("/campaign/").get(campaignController.getCampaignByName);

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
 campaignRouter.route("/").post(
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the campaign name must have minimum length of 3")
      .trim(),
  ],
  validation.validate,
  campaignController.createCampaign
);

/**
 * @swagger
 * /campaigns:
 *   post:
 *     tags: [
 *       party_campaigns
 *     ]
 *     summary: 
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
 *         description: 
 */
 campaignRouter.route("/").post(
  [
  ],
  validation.validate,
  campaignController.addPartyToCampaign
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
 campaignRouter.route("/:campaign_id(\\d+)").put(
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the campaign name must have minimum length of 3")
      .trim(),
  ],
  validation.validate,
  campaignController.updateCampaign
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
 campaignRouter.route("/:id").delete(campaignController.removeCampaign);

export { campaignRouter };
 