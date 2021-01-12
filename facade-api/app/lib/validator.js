let httpStatus = require("http-status");
let errors = require("restify-errors");

module.exports.paramValidation = (joi) => {
  return (req, res, next) => {
    // Always allow validation to allow unknown fields by default
    let options = {
      allowUnknown: true,
      convert: false,
    };

    // Validation object (joi object) in route
    let validation = req.route.spec.validation;
    if (!validation) {
      return next(); // Skip validation if joi not set
    }

    // Properties to be validated
    let validProperties = ["body", "query", "params"];

    // For every joi object
    for (let i in validation) {
      if (validProperties.indexOf(i) < 0) {
        throw new Error("An unsupported validation key was set in route");
      } else {
        if (req[i] === undefined) {
          res.send(
            httpStatus.BAD_REQUEST,
            new errors.InvalidArgumentError(`Missing request ${i}`)
          );
          return;
        }

        try {
          let result = joi.attempt(req[i], validation[i], options);
        } catch (err) {
          res.send(
            httpStatus.BAD_REQUEST,
            new errors.InvalidArgumentError(
              `Invalid request ${i} - ${err.details[0].message}`
            )
          );
          return;
        }
      }
    }
    next();
  };
};
