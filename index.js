const mongoose = require("mongoose");
const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");

console.log(config.get("name"));

mongoose
  .connect(config.get("mongodb.host"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("MongoDB Error:", err.message));

const playersRoute = require("./routes/playerRouter");
const teamsRoute = require("./routes/teamRouter");
const usersRoute = require("./routes/userRouter");
const loginRoute = require("./routes/authRouter");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));
server.use(cors());

if (process.env.NODE_ENV === "development") {
  console.log("Morgan enabled...");
  server.use(morgan("dev"));
}

server.use("/players", playersRoute);
server.use("/teams", teamsRoute);
server.use("/users", usersRoute);
server.use("/login", loginRoute);
server.get("*", (req, res) => res.status(404).send("Page not found!!!"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is listening on PORT = ${PORT}`));
