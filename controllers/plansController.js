const Plans = require("../models/planModel");

const getPlans = async (req, res) => {
  var plans = await Plans.findAll();
  res.render("cwh", { plans });
};

module.exports = getPlans;
