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
  if (idType) {
    res.status(404).send("Not Found");
  } else {
    req.params.id = id;
    next();
  }
});

minions.get("/", (req, res, next) => {
  res.status(200).send(getAllFromDatabase("minions"));
});

minions.post("/", (req, res, next) => {
  addToDatabase("minions", req.body);
  res.status(201);
});

minions.get("/:id", (req, res, next) => {
  res.status(200).send(getFromDatabaseById("minions", req.params.id));
});

minions.put("/:id", (req, res, next) => {
  const returnValue = updateInstanceInDatabase("minions", req.body);
  res.status(200).send(returnValue);
});

minions.delete("/:id", (req, res, next) => {
  deleteFromDatabasebyId("minions", req.params.id);
  res.status(200).send("Deleted");
});
module.exports = minions;
