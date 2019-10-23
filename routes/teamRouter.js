const express = require("express");
const Router = express.Router();
const TeamModel = require("../models/team");

const checkAuth = require("../middleware/auth");
const { checkAdmin } = require("../middleware/admin");

Router.get("/", async (req, res) => {
  const teams = await TeamModel.find();
  return res.send(teams);
});

Router.post("/", checkAuth, async (req, res) => {
  const team = new TeamModel(req.body);
  const saved = await team.save();
  return res.send(saved);
});

Router.put("/:id", checkAuth, async (req, res) => {
  const team = await TeamModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  return res.send(team);
});

Router.delete("/:id", checkAuth, async (req, res) => {
  const team = await TeamModel.findByIdAndDelete(req.params.id);
  return res.send(team);
});

module.exports = Router;
