const { CustomError } = require("../app/helpers/CustomError");
const { z } = require("zod");

module.exports = (app) => {
  app.use((error, _req, res, _next) => {
    if (error instanceof CustomError) {
      return res.status(Number(error.statusCode)).json({
        status: false,
        message: error.message,
        code: Number(error.statusCode),
        data: error.data,
      });
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: false,
        message: "Input Validation Failed",
        code: Number(400),
        data: error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path,
        })),
      });
    }
    return res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
      code: 500,
      data: error.data || {},
    });
  });
};
