const express = require("express");
const routes = express.Router();

//get a list of students from the database

routes.get("/student", (req, res) => {
  res.send({ type: "Get request" });
});

//add student to the database

routes.post("/student", (req, res) => {
  res.send({ type: "post Request" });
});

//update students in the database

routes.put("/student:id", (req, res) => {
  res.send({ type: "update Request" });
});

//delete a student from the database
routes.delete("/student/:id", (req, res) => {
  res.send({ type: "delete Request" });
});

module.exports = routes;
