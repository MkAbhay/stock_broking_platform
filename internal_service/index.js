const dotenv = require("dotenv");
const express = require("express");
const app = express();
const db = require("./app/models");
const { initDB } = require("./app/helpers/database_init");
const { logger } = require("./app/helpers/logger");
const { swaggerSpec } = require("./swaggerConfig");
const path = require("path");

logger.info("Loading environment variables...");
dotenv.config();
logger.info(`NODE_ENV: ${process.env.NODE_ENV || "local"}`);

// Serve JSON spec
app.get("/swagger.json", (req, res) => {
  return res.json(swaggerSpec);
});

// set api-doc folder to served stoplight web page
app.use("/api-docs", express.static(path.join(__dirname, "api-docs")));

// set public folder to served static element
app.use("/public", express.static(path.join(__dirname, "public")));

logger.info("Registering middleware...");
try {
  require("./middleware")(app);
  logger.info("Middleware registered successfully.");
} catch (err) {
  logger.error("Middleware registration failed", err);
  process.exit(1);
}

logger.info("Registering routes...");
try {
  require("./app/routes")(app);
  logger.info("Routes registered successfully.");
} catch (err) {
  logger.error("Route registration failed", err);
  process.exit(1);
}

logger.info("Registering error handler...");
try {
  require("./middleware/errorHandler")(app);
  logger.info("Error handler registered.");
} catch (err) {
  logger.error("Error handler setup failed", err);
  process.exit(1);
}

(async () => {
  logger.info("Initializing database...");
  try {
    await initDB(db);
    logger.info("Database initialized.");
  } catch (err) {
    logger.error("Database initialization failed", err);
    process.exit(1);
  }
})();

// setup cron job for syncing bse clients and trades
logger.info("Starting cron job...");
const { demon } = require("./cron/job");
demon();

// start server
const PORT = process.env.PORT;

const http = require("http");
const server = http.createServer(app);
const { initialize } = require("./socket");
initialize(server);

logger.info(`Starting server on port ${PORT}...`);
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = {
  app,
};
