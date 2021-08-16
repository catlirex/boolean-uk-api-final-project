const express = require("express");
const path = require("path");

const logger = require("morgan");

const app = express();

// Routers

const coffeeRouter = require("./src/resources/coffee/router");
const specialRequestsRouter = require("./src/resources/specialRequests/router");
const shopRouter = require("./src/resources/shops/router");
const coffeeOrdersRouter = require("./src/resources/coffeeOrders/router");

app.use(logger("dev"));
app.use(express.json());

// Routes

app.use("/coffee", coffeeRouter);
app.use("/specialRequests", specialRequestsRouter);
app.use("/shops", shopRouter);
app.use("/orders", coffeeOrdersRouter);

app.all("*", (req, res) => {
  res.status(400).json({ ERROR: "route no set, please check" });
});

module.exports = app;
