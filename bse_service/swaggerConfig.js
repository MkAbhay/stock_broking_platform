const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BSE API",
      version: "1.0.0",
      description: "API documentation for the BSE",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {},
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./apis/**/*.js"], // where your JSDoc comments live
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
