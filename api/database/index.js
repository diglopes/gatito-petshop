const Sequelize = require("sequelize");
const config = require("config");

const { database, user, pass, host, port } = config.get("Mysql");

const sequelize = new Sequelize(database, user, pass, {
  host,
  port,
  dialect: "mysql",
});

module.exports = sequelize;
