const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const ideas = express.Router({ mergeParams: true });

ideas.param("id", (req, res, next, id) => {
  const idType = isNaN(id);
  if (idType || !getFromDatabaseById("ideas", id)) {
    res.status(404).send("Not Found");
  } else {
    next();
  }
});

ideas.get("/", (req, res, next) => {
  res.status(200).send(getAllFromDatabase("ideas"));
});

ideas.post("/", (req, res, next) => {
  const newMinion = addToDatabase("ideas", req.body);
  res.status(201).send(newMinion);
});

ideas.get("/:id", (req, res, next) => {
  const minion = getFromDatabaseById("ideas", req.params.id);
  if (minion) {
    res.status(200).send(minion);
  } else {
    res.status(404).send("Not Found");
  }
});

ideas.put("/:id", (req, res, next) => {
  const returnValue = updateInstanceInDatabase("ideas", req.body);
  res.status(200).send(returnValue);
});

ideas.delete("/:id", (req, res, next) => {
  deleteFromDatabasebyId("ideas", req.params.id);
  res.status(204).send();
});

module.exports = ideas;
