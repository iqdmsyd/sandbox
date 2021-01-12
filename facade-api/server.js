const restify = require("restify");
const errors = require("restify-errors");
const logger = require("morgan");
const joi = require("joi");

const config = require("./app/configs/config");
const userRouter = require("./app/models/user/router");
const validator = require("./app/lib/validator");
const errorHandler = require("./app/lib/error-handler");

const server = restify.createServer({
  name: config.app.NAME,
  formatters: {
    "application/json": require("./app/lib/json-formatter"),
    "text/html": require("./app/lib/html-formatter"),
  },
});

const Database = require("./app/configs/database");
new Database(config.mongodb.URI);

server.pre(restify.plugins.pre.sanitizePath());
server.use(restify.plugins.bodyParser({ mapParams: false }));
server.use(restify.plugins.queryParser());
// server.use(logger("tiny"));
server.use(validator.paramValidation(joi));

server.get("/", (req, res, next) => {
  res.header("Content-Type", "text/html");
  res.send("index.html");
  next();
});

server.get("/error", (req, res, next) => {
  next(new errors.NotFoundError("Not Found"));
});

errorHandler.register(server);
userRouter.register(server);

server.listen(config.app.PORT, config.app.HOST, () => {
  // console.log(
  //   `${config.app.NAME} is running at http://${config.app.HOST}:${config.app.PORT}`
  // );
});

module.exports = server;
