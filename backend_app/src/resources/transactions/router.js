const router = require("express").Router();

const {
  getTransactionWithCoffeeOrdersById,
  getAllTransactionsForOneUser,
  todaysTransactionsForOneShop,
} = require("./controller");

router.get("/shop/:shopId/today", todaysTransactionsForOneShop);

router.get("/user/:userId", getAllTransactionsForOneUser);

router.get("/:id/orders", getTransactionWithCoffeeOrdersById);

module.exports = router;
