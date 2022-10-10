const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");

const {
    getCampaigns,
    getCampaignByName,
    getCampaignById,  
    createCampaign, 
    updateCampaign, 
    removeCampaign,
} = require("../controllers/party");
const {  } = require("../services/parties");

router.route("/").get(getCampaigns);
router.route("/:party_id(\\d+)").get(getCampaignById);
router.route("/party/").get(getCampaignByName);
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
  createCampaign
);
router.route("/:campaign_id(\\d+)").put(
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
  updateCampaign
);
router.route("/:id").delete(removeCampaign);

module.exports = router;
 