const router = require("express").Router();

const { getAll } = require("./controller.js");

router.get("/", getAll);

module.exports = router;
