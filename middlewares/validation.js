const { generateError } = require("../helpers");

const validation = (schema) => {
  const func = (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw generateError(400);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = validation;
