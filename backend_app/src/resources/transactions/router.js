const router = require("express").Router();

const {
  getTransactionDetailsById,
  getAllTransactionsForOneUser,
  todaysTransactionsForOneShop,
} = require("./controller");

router.get("/shop/:shopId/today", todaysTransactionsForOneShop);

router.get("/user/:userId", getAllTransactionsForOneUser);

router.get("/:id/orders", getTransactionDetailsById);

module.exports = router;
