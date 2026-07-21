const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { logger } = require("../app/helpers/logger");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  // logging middleware
  app.use((req, res, next) => {
    const start = Date.now();
    const formattedDate = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
    res.on("finish", () => {
      const duration = Date.now() - start;
      logger.info(
        `[${formattedDate}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      );
    });
    next();
  });

  // response helper methods
  app.use((_req, res, next) => {
    res.success = (code = 200, message = "Success", data = {}) => {
      return res.status(code).json({
        status: true,
        message,
        code,
        data,
      });
    };
    res.error = (code = 500, message = "Error", data = {}) => {
      return res.status(code).json({
        status: false,
        message,
        code,
        data,
      });
    };
    next();
  });
};
