const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = "secret";

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
  });
  return post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        id: savedPost._id,
        title: savedPost.title,
        content: savedPost.content,
        author: savedPost.author,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res, next) {
  const posts = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ posts: posts });
});
module.exports = router;
