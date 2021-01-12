const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve("./env/", process.env.NODE_ENV + ".env"),
});

module.exports = {
  app: {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    NAME: process.env.NAME,
  },
  mongodb: {
    URI: process.env.MONGODB_URI,
  },
  log: {
    LOG_PATH: process.env.LOG_PATH,
  },
};
