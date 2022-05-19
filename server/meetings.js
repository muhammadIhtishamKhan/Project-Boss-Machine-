const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require("./db");
const meetings = express.Router({ mergeParams: true });

meetings.get("/", (req, res, next) => {
  res.status(200).send(getAllFromDatabase("meetings"));
});

meetings.post("/", (req, res, next) => {
  const newMeeting = createMeeting();
  addToDatabase("meetings", newMeeting);
  res.status(201).send(newMeeting);
});

meetings.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = meetings;
