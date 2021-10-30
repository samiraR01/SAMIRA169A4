const db = require("../config/db");
const User = require("../models/usersModel");
const authRegister = require("../middleware/authRegister");
const authUser = require("../middleware/authUser");

const userLogin = (req, res) => {
  if (req.body.userName === "" || req.body.password === "") {
    const error = "Email/Password fields must not be empty!";
    res.render("login", { error });
    // } else if (
    //   /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(req.body.userName)
    // ) {
    //   res.render("login", {
    //     error: "Username must not contain special characters!",
    //   });
  } else {
    authUser(req, res);
  }
};

const registerUser = (req, res) => {
  console.log(req.body);
  authRegister(req, res)
    .then(async () => {
      const { firstName, lastName, email, phone, password } = req.body;
      const userExists = await User.findOne({ where: { email: email } });

      if (userExists) {
        res.render("registration", { error: "User already exists" });
        throw new Error("User already exists");
      }
      db.sync().then(async function () {
        await User.create({
          firstName,
          lastName,
          email,
          phone,
          password,
        })
          .then(function (user) {
            console.log("success!");
          })
          .catch(function (error) {
            console.log("something went wrong!");
          });
        res.redirect("/dashboard");
      });
    })
    .catch((err) => console.log(err));
};

const getUserDashboard = (req, res) => {
  res.render("dashboard");
};

module.exports = {
  userLogin,
  registerUser,
  getUserDashboard,
};
