const router = require("express").Router();

const { getAllUsers, getUserById, createUser } = require("./controller");

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

module.exports = router;
