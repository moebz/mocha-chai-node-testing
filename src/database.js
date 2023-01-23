const Sequelize = require("sequelize");
require("dotenv").config();
const enviroment = process.env;
const { UserModel } = require("./user/model");

const sequelize = new Sequelize(
  enviroment.RDB_NAME,
  enviroment.RDB_USER,
  enviroment.RDB_PASSWORD,
  {
    host: enviroment.RDB_HOST,
    dialect: "postgres",
  }
);

const models = {
  UserModel: UserModel.init(sequelize, Sequelize),
};

const db = {
  ...models,
  sequelize,
};

module.exports = db;
