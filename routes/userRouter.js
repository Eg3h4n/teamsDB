const express = require("express");
const Router = express.Router();
const UserModel = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

Router.post("/", async (req, res) => {
  const validCheck = await UserModel.findOne({ email: req.body.email });
  if (!validCheck) {
    const user = new UserModel(req.body);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const saved = await user.save();
    return res.send(
      /* { id: saved._id, email: saved.email } */ _.pick(saved, [
        "_id",
        "email",
        "isAdmin"
      ])
    );
  } else {
    res.status(400).send("Email already exists");
  }
});

module.exports = Router;
