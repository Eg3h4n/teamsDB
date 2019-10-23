const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: String,
  age: Number
});

const PlayerModel = mongoose.model("player", PlayerSchema);

module.exports = PlayerModel;
