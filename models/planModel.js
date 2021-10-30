const Sequelize = require("sequelize");
const db = require("../config/db");

var Plans = db.define("Plans", {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.DOUBLE,
});

module.exports = Plans;
