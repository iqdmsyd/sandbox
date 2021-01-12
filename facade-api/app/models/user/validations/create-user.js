const joi = require("joi");

module.exports = joi
  .object()
  .keys({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
  })
  .required();
