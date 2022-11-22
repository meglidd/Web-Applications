const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const privateKey = ``;

const router = express.Router();

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      /// log the
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    complete: req.payload.complete,
  });
  return todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        _id: savedTodo._id,
        title: savedTodo.title,
        content: savedTodo.content,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Something went wrong." });
    });
});

router.get("/", async function (req, res, next) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  //const todos = await Todo.find().exec();
  return res.status(200).json({ todos: todos });
});

router.get("/:id", async function (req, res, next) {
  const todo = await Todo.findOne().where("_id").equals(req.params.id).exec();
  //const todos = await Todo.find().exec();
  return res.status(200).json(todo);
});

router.delete("/", async function (req, res) {
  const todos = await Todo.delete(req);
  return res.status(200).json({ todos: todos });
});

router.put("/", async function (req, res) {
  const todos = await Todo.find()
    .where("complete")
    .equals(req.payload.id)
    .exec();
  return res.status(200).json({ todos: todos });
});

module.exports = router;
