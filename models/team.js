const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "player" }]
});

const TeamModel = mongoose.model("team", TeamSchema);

module.exports = TeamModel;
