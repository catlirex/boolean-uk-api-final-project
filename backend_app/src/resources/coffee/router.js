const router = require("express").Router();

const { getAll, getCoffeeByName } = require("./controller.js");

router.get("/", getAll);

router.get("/:name", getCoffeeByName);

module.exports = router;
