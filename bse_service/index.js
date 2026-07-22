const dotenv = require("dotenv");
const express = require("express");
const app = express();
const { swaggerSpec } = require("./swaggerConfig");
const path = require("path");

const clients_data = require("./seeder/clients.json");
const rm_data = require("./seeder/rm.json");
const rm_client_mapping_data = require("./seeder/rm_client_mapping.json");
const { trades } = require("./apis");

dotenv.config();

// Serve JSON spec
app.get("/swagger.json", (req, res) => {
  return res.json(swaggerSpec);
});

// set api-doc folder to served stoplight web page
app.use("/api-docs", express.static(path.join(__dirname, "api-docs")));

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apis for health check
app.get("/api/health", (req, res) => {
  return res
    .status(200)
    .json({ status: true, code: 200, message: "server running", data: {} });
});

// apis for client
app.get("/api/clients", async (req, res) => {
  return res.status(200).json({ status: true, code: 200, data: clients_data });
});

// apis for employee
app.get("/api/employees", async (req, res) => {
  return res.status(200).json({ status: true, code: 200, data: rm_data });
});

// apis for rm_client_mapping
app.get("/api/rm_client_mapping", async (req, res) => {
  return res
    .status(200)
    .json({ status: true, code: 200, data: rm_client_mapping_data });
});

// apis for trades
app.get("/api/trades", async (req, res) => {
  try {
    const { client_code, start_date, end_date, page, limit } = req.query;
    const response = await trades({
      client_code,
      start_date,
      end_date,
      page,
      limit,
    });

    return res.status(200).json({ status: true, code: 200, data: response });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: false,
      code: error.status || 500,
      message: error.message || "Internal Server Error",
      data: {},
    });
  }
});

app.use((req, res) => {
  return res.status(404).json({
    status: false,
    code: 404,
    message: "Not Found",
    data: {},
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = {
  app,
};
