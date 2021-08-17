const router = require("express").Router();

const { getAll, getUniqueShop, getShopsEstimateTime } = require("./controller");

router.get("/", getAll);
router.get("/estimateTime", getShopsEstimateTime);

router.get("/:postcode", getUniqueShop);

module.exports = router;
