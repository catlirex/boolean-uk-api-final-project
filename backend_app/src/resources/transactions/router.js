const router = require("express").Router();

const {
  getTransactionDetailsById,
  getAllTransactionsForOneUser,
  todaysTransactionsForOneShop,
  createTransaction,
  patchTransaction,
  deleteTrascaction,
} = require("./controller");

router.get("/shop/:shopId/today", todaysTransactionsForOneShop);

router.get("/user/:userId", getAllTransactionsForOneUser);

router.get("/:id/orders", getTransactionDetailsById);

router.post("/", createTransaction);

router.patch("/:id", patchTransaction);

router.delete("/:id", deleteTrascaction);

module.exports = router;
