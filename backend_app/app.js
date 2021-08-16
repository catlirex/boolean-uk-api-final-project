const express = require("express");
const path = require("path");

const logger = require("morgan");

const app = express();

// Routers

const coffeeRouter = require("./src/resources/coffee/router");
const specialRequestsRouter = require("./src/resources/specialRequests/router");
const shopRouter = require("./src/resources/shops/router");
const userRouter = require("./src/resources/users/router");

app.use(logger("dev"));
app.use(express.json());

// Routes

app.use("/coffee", coffeeRouter);
app.use("/specialRequests", specialRequestsRouter);
app.use("/shops", shopRouter);
app.use("/users", userRouter);

app.all("*", (req, res) => {
  res.json({ msg: "ok!" });
});

module.exports = app;
