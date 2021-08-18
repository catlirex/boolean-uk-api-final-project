const router = require("express").Router();

const { getAllUsers, getUserByPhone, createUser } = require("./controller");

router.get("/", getAllUsers);

router.get("/:phone", getUserByPhone);

router.post("/", createUser);

module.exports = router;
