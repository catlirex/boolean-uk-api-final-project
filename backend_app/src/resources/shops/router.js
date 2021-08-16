const router = require("express").Router();

const { getAll, getUniqueShop } = require("./controller");

router.get("/", getAll);

router.get("/:postcode", getUniqueShop);

module.exports = router;
