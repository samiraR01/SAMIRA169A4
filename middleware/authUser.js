const User = require("../models/usersModel");

const authUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ where: { email: userName } });
  if (user && (await user.password) === password) {
    if (user.isAdmin) {
      res.render("adminDashboard", { user });
    } else {
      res.render("dashboard", { user });
    }
  } else {
    const error = "Username or Password is incorrect";
    res.render("login", { error });
  }
};

module.exports = authUser;
