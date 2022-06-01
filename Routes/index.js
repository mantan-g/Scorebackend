const Router = require("express").Router();
const { User } = require("../Schema/users");
const controller = require("../Controller/index");

Router.post("/add/score", controller.addScore);
Router.post("/get/info", controller.getDataForDashboard);

module.exports = Router;
