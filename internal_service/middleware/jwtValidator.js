const jwt = require("jsonwebtoken");
const { logger } = require("../app/helpers/logger");
const { CustomError } = require("../app/helpers/CustomError");

const jwtValidator = (req, _res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    logger.error("Access token is not present", {
      uri: req.uri,
      header: req.headers,
    });
    return next(new CustomError("UnAuthorized Access", 401, "UNAUTHORIZED"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      logger.error("Invalid or expired token", {
        uri: req.uri,
        payload: payload,
        token: token,
        header: req.headers,
        error: err,
      });
      return next(
        new CustomError("Invalid or expired token", 401, "UNAUTHORIZED"),
      );
    }
    req.user = payload;
    next();
  });
};

module.exports = jwtValidator;
