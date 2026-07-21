const router = require("express").Router();
const { CustomError } = require("../helpers/CustomError");

module.exports = (app) => {
  require("./v1")(router);

  app.use("/api/v1", router);

  // health check
  app.use("/api/health", (_, res) => {
    res.status(200).json({
      status: true,
      message: "Server is running healthy",
      code: 200,
      data: {},
    });
  });

  // not found
  app.use((req, _res, next) => {
    next(
      new CustomError("Not Found", 404, "NotFoundException", {
        details: `'${req.url}' does not exist`,
      }),
    );
  });
};

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health Check
 *     summary: Check if the server is running healthy
 *     description: Returns a message indicating the health status of the server.
 *     responses:
 *       200:
 *         description: Server is running healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Server is running healthy
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   example: {}
 */
