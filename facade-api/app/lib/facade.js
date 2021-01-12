const mongoose = require("mongoose");

class Facade {
  constructor(name, schema) {
    this.Model = mongoose.model(name, schema);
  }

  create(body) {
    const model = new this.Model(body);
    return model.save();
  }

  find(...args) {
    return this.Model.find(...args).exec();
  }

  findById(...args) {
    return this.Model.findById(...args).exec();
  }

  updateOne(...args) {
    return this.Model.updateOne(...args).exec();
  }

  deleteOne(...args) {
    return this.Model.deleteOne(...args).exec();
  }
}

module.exports = Facade;
