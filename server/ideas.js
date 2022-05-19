const express = require("express");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");
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

ideas.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newidea = addToDatabase("ideas", req.body);
  res.status(201).send(newidea);
});

ideas.get("/:id", (req, res, next) => {
  const idea = getFromDatabaseById("ideas", req.params.id);
  if (idea) {
    res.status(200).send(idea);
  } else {
    res.status(404).send("Not Found");
  }
});

ideas.put("/:id", checkMillionDollarIdea, (req, res, next) => {
  const returnValue = updateInstanceInDatabase("ideas", req.body);
  res.status(200).send(returnValue);
});

ideas.delete("/:id", (req, res, next) => {
  deleteFromDatabasebyId("ideas", req.params.id);
  res.status(204).send();
});

module.exports = ideas;
