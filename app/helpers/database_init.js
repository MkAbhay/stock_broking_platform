const { logger } = require("./logger");
const { CustomError } = require("../helpers/CustomError");

const initDB = async (db) => {
  try {
    await db.sequelize.authenticate();
    logger.info("Database connection established");

    if ("local" === process.env.NODE_ENV) {
      await db.sequelize.sync({ alter: true, force: false });
      logger.info("Tables synced");
    } else {
      logger.info("Skipped syncing tables since the environment is not local", {
        environment: process.env.NODE_ENV,
      });
    }
  } catch (err) {
    logger.error("DB connection or sync failed:", err);
    throw new CustomError(
      "Failed to connect to db",
      500,
      "DBConntectionException",
    );
  }
};

module.exports = {
  initDB,
};
