const mongoose = require("mongoose");
const config = require("./config");

class Database {
  constructor(uri) {
    this.mongoose = mongoose;
    this._connect(uri);
  }

  _connect(uri) {
    this.mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    const { connection } = this.mongoose;

    if (config.app.NODE_ENV !== "test") {
      connection.on("connected", () => {
        console.log("Database connection was successfull");
      });

      connection.on("error", () => {
        console.log("Database connection failed");
      });

      connection.on("disconnected", () => {
        console.log("Database connection disconnected");
      });

      process.on("SIGINT", () => {
        connection.close();
        console.log(
          "Database Connection closed due to NodeJS process termination"
        );
        process.exit(0);
      });
    }
  }
}

module.exports = Database;
