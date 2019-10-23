const express = require("express");
const Router = express.Router();

const PlayerModel = require("../models/player");
const auth = require("../middleware/auth");
const { checkAdmin } = require("../middleware/admin");

Router.get("/", async (req, res) => {
  const players = await PlayerModel.find();
  return res.send(players);
});

Router.post("/", [auth, checkAdmin], async (req, res) => {
  const player = new PlayerModel(req.body);
  const saved = await player.save();
  return res.send(saved);
});

Router.put("/:id", [auth, checkAdmin], async (req, res) => {
  const player = await PlayerModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  return res.send(player);
});

Router.delete("/id", [auth, checkAdmin], async (req, res) => {
  const player = await PlayerModel.findByIdAndDelete(req.params.id);
  return res.send(player);
});

module.exports = Router;
