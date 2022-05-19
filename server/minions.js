const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const minions = express.Router({ mergeParams: true });

minions.param("id", (req, res, next, id) => {
  const idType = isNaN(id);
  if (idType || !getFromDatabaseById("minions", id)) {
    res.status(404).send("Not Found");
  } else {
    next();
  }
});

minions.get("/", (req, res, next) => {
  res.status(200).send(getAllFromDatabase("minions"));
});

minions.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minions.get("/:id", (req, res, next) => {
  const minion = getFromDatabaseById("minions", req.params.id);
  if (minion) {
    res.status(200).send(minion);
  } else {
    res.status(404).send("Not Found");
  }
});

minions.put("/:id", (req, res, next) => {
  const returnValue = updateInstanceInDatabase("minions", req.body);
  res.status(200).send(returnValue);
});

minions.delete("/:id", (req, res, next) => {
  deleteFromDatabasebyId("minions", req.params.id);
  res.status(204).send();
});
module.exports = minions;
