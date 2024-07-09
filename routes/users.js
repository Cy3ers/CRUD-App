const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const userDataPath = path.join(__dirname, "../data/users.json");

const readData = () => {
  const data = fs.readFileSync(userDataPath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), "utf8");
};

router.get("/", (req, res) => {
  const data = readData();
  res.send(data.users);
});

router.get("/:id", (req, res) => {
  const data = readData();
  const user = data.users.find((c) => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.post("", (req, res) => {
  const data = readData();
  const newUser = {
    id: data.users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  data.users.push(newUser);
  writeData(data);
  res.send(newUser);
});

router.put("/:id", (req, res) => {
  const data = readData();
  const user = data.users.find((c) => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("The user with the given ID was not found.");

  user.name = req.body.name;
  user.email = req.body.email;

  writeData(data);
  res.send(user);
});

router.patch("/:id", (req, res) => {
  const data = readData();
  const user = data.users.find((c) => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("The user with the given ID was not found.");

  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.email) {
    user.email = req.body.email;
  }

  writeData(data);
  res.send(user);
});

router.delete("/:id", (req, res) => {
  const data = readData();
  const userIndex = data.users.findIndex((c) => c.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("The user with the given ID was not found.");

  const deletedUser = data.users.splice(userIndex, 1);
  writeData(data);

  res.send(deletedUser);
});

module.exports = router;
