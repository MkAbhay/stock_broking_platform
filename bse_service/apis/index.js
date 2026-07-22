const trades = require("./trades");

module.exports = {
  trades,
};

// swagger documentation for the API

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     description: |
 *       Fetches all clients available in the mock BSE feed.
 *       Returns client details including client code, name, PAN, email, and phone.
 *     tags: [Clients]
 *     responses:
 *       '200':
 *         description: Clients fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       client_code:
 *                         type: string
 *                         example: CL00001
 *                       name:
 *                         type: string
 *                         example: Aarav Sharma
 *                       email:
 *                         type: string
 *                         example: aarav.sharma@example.com
 *                       phone:
 *                         type: string
 *                         example: 9876543210
 *                       pan:
 *                         type: string
 *                         example: ABCDE1234F
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /trades:
 *   get:
 *     summary: Get trades
 *     description: |
 *       Fetches trades from the mock BSE feed.
 *       Supports filtering by client code and trade date range.
 *       Supports pagination using page and limit parameters.
 *       API may simulate delay and random failures based on configuration.
 *
 *     tags: [Trades]
 *
 *     parameters:
 *       - in: query
 *         name: client_code
 *         required: false
 *         description: Filter trades by client code
 *         schema:
 *           type: string
 *         example: CL00001
 *
 *       - in: query
 *         name: start_date
 *         required: false
 *         description: Filter trades from date
 *         schema:
 *           type: string
 *           format: date
 *         example: 2025-01-01
 *
 *       - in: query
 *         name: end_date
 *         required: false
 *         description: Filter trades till date
 *         schema:
 *           type: string
 *           format: date
 *         example: 2025-12-31
 *
 *     responses:
 *
 *       '200':
 *         description: Trades fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *
 *                 status:
 *                   type: boolean
 *                   example: true
 *
 *                 code:
 *                   type: integer
 *                   example: 200
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *
 *                       id:
 *                         type: integer
 *                         example: 1
 *
 *                       trade_id:
 *                         type: string
 *                         example: TR00000001
 *
 *                       client_id:
 *                         type: integer
 *                         example: 10
 *
 *                       client_code:
 *                         type: string
 *                         example: CL00010
 *
 *                       date:
 *                         type: string
 *                         format: date-time
 *
 *                       symbol:
 *                         type: string
 *                         example: RELIANCE
 *
 *                       quantity:
 *                         type: integer
 *                         example: 100
 *
 *                       price:
 *                         type: number
 *                         example: 2500.50
 *
 *                       brokerage:
 *                         type: number
 *                         example: 375.08
 *
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *
 *
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
