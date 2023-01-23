const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./user/routes");
const sequelize = require("./database").sequelize;
const status = require("http-status");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.use("/api/v1", routes);
app.get("*", (req, res) => {
  res.status(status.NOT_FOUND).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
