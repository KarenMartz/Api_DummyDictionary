var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var passport = require("passport");
require("./auth/auth");
require("./database/config");

var userRouter = require("./routers/user");
var wordRouter = require("./routers/word");
var authRouter = require("./routers/auth");
var errorHandler = require("./middleware/errorHandler");

const { authadmin } = require("./auth/auth");

var app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(authRouter);
app.use(passport.authenticate("jwt", { session: false }))
app.use("/users", userRouter);
app.use("/words", wordRouter);
app.use(errorHandler);

module.exports = app;