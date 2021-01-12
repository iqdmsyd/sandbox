const mongoose = require("mongoose");
const errors = require("restify-errors");

class Controller {
  constructor(facade) {
    this.facade = facade;
  }

  create(req, res, next) {
    return this.facade
      .create(req.body)
      .then((doc) => res.send(201, doc))
      .catch((err) => next(err));
  }

  find(req, res, next) {
    return this.facade
      .find(req.query)
      .then((collection) => res.send(200, collection))
      .catch((err) => next(err));
  }

  findById(req, res, next) {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return next(
        new errors.InvalidContentError(`Id - ${id} is not an objectId`)
      );
    } else {
      return this.facade
        .findById(id)
        .then((doc) => {
          if (!doc) {
            return next(
              new errors.NotFoundError(`Doc with id - ${id} can not be found`)
            );
          }
          return res.send(200, doc);
        })
        .catch((err) => next(err));
    }
  }

  updateOne(req, res, next) {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return next(
        new errors.InvalidContentError(`Id - ${id} is not an objectId`)
      );
    } else {
      this.facade
        .updateOne({ _id: id }, req.body)
        .then((results) => {
          if (results.n < 1) {
            return next(
              new errors.NotFoundError(`Doc with id - ${id} can not be found`)
            );
          }
          if (results.nModified < 1) {
            return res.send(304);
          }
          res.send(204);
        })
        .catch((err) => next(err));
    }
  }

  deleteOne(req, res, next) {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return next(
        new errors.InvalidContentError(`Id - ${id} is not an objectId`)
      );
    } else {
      this.facade
        .deleteOne({ _id: id })
        .then((doc) => {
          if (!doc) {
            return next(
              new errors.NotFoundError(`Doc with id - ${id} can not be found`)
            );
          }
          return res.send(204);
        })
        .catch((err) => next(err));
    }
  }
}

module.exports = Controller;
