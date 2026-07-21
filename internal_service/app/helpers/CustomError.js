class CustomError extends Error {
  constructor(message, statusCode = 500, name = undefined, data = null) {
    super(message);
    this.name = name || this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  CustomError,
};
