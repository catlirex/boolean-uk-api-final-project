const { coffeeOrder } = require("../../utils/database");

async function getOneOrder(req, res) {
  const id = Number(req.params.id);
  const result = await coffeeOrder.findUnique({
    where: { id },
    include: { coffee: true },
  });
  if (result) res.json(result);
  if (!result) res.json({ msg: "Item not found" });
}

async function getOrdersOfTransaction(req, res) {
  const id = Number(req.params.id);
  const result = await coffeeOrder.findMany({ where: { transction: { id } } });
  if (result) res.json(result);
  if (!result) res.json({ msg: "Item not found" });
}

async function postOneCoffeeOrder(req, res) {
  const newOrder = req.body;
  let validOrder = newOrderChecker(newOrder);
  if (!validOrder) return res.status(400).json({ ERROR: "Order info invalid" });
  try {
    const createdOrder = await coffeeOrder.create({ data: newOrder });
    res.json(createdOrder);
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
}

function newOrderChecker(newOrder) {
  const orderNotNullKey = ["quantity", "transaction_id", "coffee_id"];
  let lengthMatch = false;

  const hasAllKeys = orderNotNullKey.every((item) =>
    newOrder.hasOwnProperty(item)
  );

  if (!newOrder.special_requests)
    Object.keys(newOrder).length === orderNotNullKey.length
      ? (lengthMatch = true)
      : (lengthMatch = false);

  if (newOrder.special_requests)
    Object.keys(newOrder).length === orderNotNullKey.length + 1
      ? (lengthMatch = true)
      : (lengthMatch = false);

  if (hasAllKeys && lengthMatch) return true;
  else return false;
}

module.exports = { getOneOrder, getOrdersOfTransaction, postOneCoffeeOrder };
