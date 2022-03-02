require("./config/config");
require("./models/db");
require("./config/passportConfig");

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const routeIndex = require("./routes/index.route");
var app = express();

//setting middleware
app.use(bodyParser.json());
app.use(cors());
const passport = require("passport");

app.use(passport.initialize());
app.use("/api", routeIndex);

//Error middleware
app.use((error, req, res, next) => {
  if (error.name === "ValidationError") {
    var valError = [];
    Object.keys(error.errors).forEach(key =>
      valError.push(error.errors[key].message)
    );
    res.status(400).send(valError);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
