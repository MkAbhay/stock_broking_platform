"use strict";

require("dotenv").config(); // Load .env variables

const environment = process.env.NODE_ENV || "local";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { logger } = require("../helpers/logger");
const basename = path.basename(__filename);
const db = {};

try {
  // Directly use .env variables
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      pool: {
        max: Number(process.env.MAX_DB_CONNECTIONS || 5),
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      logging: environment === "local" ? (msg) => logger.info(msg) : false,
    },
  );

  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach((file) => {
      try {
        const model = require(path.join(__dirname, file))(
          sequelize,
          Sequelize.DataTypes,
        );
        db[model.name] = model;
      } catch (err) {
        logger.error(`Failed to load model from file ${file}:`, err);
        throw err;
      }
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
} catch (err) {
  logger.error("Sequelize models index.js failed:", err);
  throw err;
}
module.exports = db;
