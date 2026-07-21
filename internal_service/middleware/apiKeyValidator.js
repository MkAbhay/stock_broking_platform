const { CustomError } = require("../app/helpers/CustomError");

const apiKeyValidator = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.API_KEY) {
      return next(new CustomError("UnAuthorized Access", 401, "UNAUTHORIZED"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = apiKeyValidator;
