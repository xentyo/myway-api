var express = require("express");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiUserRoutes = require("./routes/UserRoutes");

var app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB CONF
const db = require("./config/keys").mongoURI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(db)
  .then(() => console.log("mongo db connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

// Passpor config
require("./config/passport")(passport);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use(express.static(path.join(__dirname, "node_modules/axios/dist")));

// ROUTES

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/users", apiUserRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
