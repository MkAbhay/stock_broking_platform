const validate = (schema, requestPart = "body") => {
  return (req, _res, next) => {
    const result = schema.safeParse(req[requestPart]);

    if (!result.success) {
      return next(result.error);
    }

    // overwrite with parsed data
    req[requestPart] = result.data;
    next();
  };
};

module.exports = validate;
