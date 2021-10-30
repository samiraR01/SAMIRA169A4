const Sequelize = require("sequelize");
const db = require("../config/db");

var Project = db.define("Project", {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
});

db.sync().then(function () {
  // create a new "Project" and add it to the database
  Project.create({
    title: "Project1",
    description: "First Project",
  })
    .then(function (project) {
      // you can now access the newly created Project via the variable project
      console.log("success!");
    })
    .catch(function (error) {
      console.log("something went wrong!");
    });
});
