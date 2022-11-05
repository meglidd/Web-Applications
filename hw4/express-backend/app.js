var express = require("express");

var app = express();

require("./setupMongo")();

app.use(express.json());

app.use(function (req, res, next) {
  req.traceID = uuidv4();
  next();
});

app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/Todo"));

app.use(function (err, req, res, next) {
  console.error(err.stack);
});

module.exports = app;
