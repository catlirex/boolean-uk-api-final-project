const coffeeOrdersRouter = require("express").Router();

const {
  getOneOrder,
  getOrdersOfTransaction,
  postOneCoffeeOrder,
} = require("./controller");

coffeeOrdersRouter.get("/:id", getOneOrder);
coffeeOrdersRouter.get("/transaction/:transactionId", getOrdersOfTransaction);
coffeeOrdersRouter.post("/", postOneCoffeeOrder);

module.exports = coffeeOrdersRouter;
