const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user");
const JWT_SECRET = require("../config/secret");

Router.post("/", async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email or password!");

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid)
    return res.status(400).send("Invalid email or password!");

  const token = jwt.sign(
    { _id: user._id, email: user.email, isAdmin: user.isAdmin },
    JWT_SECRET
  );

  return res.header("x-jwt-token", token).send(`Welcome back ${user.email}`);
});

module.exports = Router;
