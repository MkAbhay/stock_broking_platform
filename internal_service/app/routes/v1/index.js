const getClients = require("../../controllers/client");
const getClientsById = require("../../controllers/clientById");
const getTrades = require("../../controllers/trade");
const getEmployees = require("../../controllers/employee");
const getIncentive = require("../../controllers/incentive");
const getIncentiveById = require("../../controllers/incentiveById");

const login = require("../../controllers/auth");

module.exports = (router) => {
  router.get("/clients/:employee_code", getClientsById);
  router.get("/clients", getClients);
  router.get("/trades", getTrades);
  router.get("/employees", getEmployees);
  router.get("/incentive/:employee_code", getIncentiveById);
  router.get("/incentive", getIncentive);

  router.post("/login", login);
};

/**
 * @swagger
 * /v1/clients:
 *   get:
 *     summary: Get clients
 *     description: Returns a paginated list of clients with optional search and sorting.
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: searchText
 *         schema:
 *           type: string
 *         description: Search by client name or client code
 *         example: Aarav
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - id
 *             - client_code
 *             - name
 *             - email
 *             - created_at
 *         description: Field to sort by
 *         example: name
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 *         description: Sort order
 *         example: ASC
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
 *                         example: "9876543210"
 *                       pan:
 *                         type: string
 *                         example: ABCDE1234F
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     size:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 300
 *                     totalPages:
 *                       type: integer
 *                       example: 30
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/clients/{employee_code}:
 *   get:
 *     summary: Get clients assigned to a Relationship Manager
 *     description: Returns all clients mapped to the specified Relationship Manager.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: employee_code
 *         required: true
 *         schema:
 *           type: string
 *         description: Relationship Manager employee code
 *         example: RM0001
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
 *                         example: "9876543210"
 *                       pan:
 *                         type: string
 *                         example: ABCDE1234F
 *       '404':
 *         description: Relationship Manager not found or no clients assigned
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/employees:
 *   get:
 *     summary: Get Relationship Managers
 *     description: Returns a paginated list of Relationship Managers with optional search and sorting.
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: searchText
 *         schema:
 *           type: string
 *         description: Search by employee name or employee code
 *         example: RM0001
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: name
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order
 *     responses:
 *       '200':
 *         description: Employees fetched successfully
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
 *                       employee_code:
 *                         type: string
 *                         example: RM0001
 *                       name:
 *                         type: string
 *                         example: Rahul Sharma
 *                       email:
 *                         type: string
 *                         example: rahul.sharma@company.com
 *                       phone:
 *                         type: string
 *                         example: "9876543210"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     size:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 20
 *                     totalPages:
 *                       type: integer
 *                       example: 2
 *                     hasNext:
 *                       type: boolean
 *                       example: true
 *                     hasPrevious:
 *                       type: boolean
 *                       example: false
 *                 filters:
 *                   type: object
 *                   properties:
 *                     searchText:
 *                       type: string
 *                       example: Rahul
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/trades:
 *   get:
 *     summary: Get trades
 *     description: |
 *       Returns a paginated list of trades.
 *
 *       Supports filtering by:
 *       - Client name
 *       - Client code
 *       - Trade date range
 *       - Sorting
 *     tags: [Trades]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: searchText
 *         schema:
 *           type: string
 *         description: Search by client name or client code
 *         example: CL00001
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter trades from this date (inclusive)
 *         example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter trades until this date (inclusive)
 *         example: "2025-12-31"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: date
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order
 *     responses:
 *       '200':
 *         description: Trades fetched successfully
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
 *                       trade_id:
 *                         type: string
 *                         example: TR00000001
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       symbol:
 *                         type: string
 *                         example: RELIANCE
 *                       quantity:
 *                         type: integer
 *                         example: 100
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 2450.75
 *                       client:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           client_code:
 *                             type: string
 *                             example: CL00001
 *                           name:
 *                             type: string
 *                             example: Aarav Sharma
 *                           email:
 *                             type: string
 *                             example: aarav.sharma@example.com
 *                           phone:
 *                             type: string
 *                             example: "9876543210"
 *                           pan:
 *                             type: string
 *                             example: ABCDE1234F
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     size:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 5000
 *                     totalPages:
 *                       type: integer
 *                       example: 500
 *                     hasNext:
 *                       type: boolean
 *                       example: true
 *                     hasPrevious:
 *                       type: boolean
 *                       example: false
 *                 filters:
 *                   type: object
 *                   properties:
 *                     searchText:
 *                       type: string
 *                       example: CL00001
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-01-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-12-31"
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/incentive:
 *   get:
 *     summary: Get RM incentive summary
 *     description: |
 *       Returns Relationship Manager incentive data.
 *
 *       Calculates total brokerage generated by each RM based on
 *       trades performed by their mapped clients.
 *
 *       Supports pagination and search by RM name or employee code.
 *     tags: [Incentive]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *
 *       - in: query
 *         name: searchText
 *         schema:
 *           type: string
 *         description: Search by RM name or employee code
 *         example: RM0001
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: employee_code
 *         description: Sort field
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order
 *
 *     responses:
 *       '200':
 *         description: Incentive data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                       id:
 *                         type: integer
 *                         example: 1
 *
 *                       employee_code:
 *                         type: string
 *                         example: RM0001
 *
 *                       name:
 *                         type: string
 *                         example: Rahul Sharma
 *
 *                       email:
 *                         type: string
 *                         example: rahul.sharma@company.com
 *
 *                       phone:
 *                         type: string
 *                         example: "9876543210"
 *
 *                       total_brokerage:
 *                         type: number
 *                         format: float
 *                         example: 125000.50
 *
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *
 *                     limit:
 *                       type: integer
 *                       example: 10
 *
 *                     size:
 *                       type: integer
 *                       example: 10
 *
 *                     total:
 *                       type: integer
 *                       example: 20
 *
 *                     totalPages:
 *                       type: integer
 *                       example: 2
 *
 *                     hasNext:
 *                       type: boolean
 *                       example: true
 *
 *                     hasPrevious:
 *                       type: boolean
 *                       example: false
 *
 *                 filters:
 *                   type: object
 *                   properties:
 *                     searchText:
 *                       type: string
 *                       example: Rahul
 *
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/incentive/{employee_code}:
 *   get:
 *     summary: Get incentive by employee code
 *     description: |
 *       Returns incentive details for a specific Relationship Manager.
 *
 *       Calculates total brokerage generated from all trades
 *       performed by clients assigned to the RM.
 *     tags: [Incentive]
 *
 *     parameters:
 *       - in: path
 *         name: employee_code
 *         required: true
 *         schema:
 *           type: string
 *         description: Relationship Manager employee code
 *         example: RM0001
 *
 *     responses:
 *       '200':
 *         description: Incentive details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *
 *                 code:
 *                   type: integer
 *                   example: 200
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *
 *                     employee_code:
 *                       type: string
 *                       example: RM0001
 *
 *                     name:
 *                       type: string
 *                       example: Rahul Sharma
 *
 *                     email:
 *                       type: string
 *                       example: rahul.sharma@company.com
 *
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *
 *                     total_brokerage:
 *                       type: number
 *                       format: float
 *                       example: 125000.50
 *
 *       '404':
 *         description: RM not found
 *
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Login
 *     description: |
 *       Logs in a Relationship Manager and returns authentication token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_code:
 *                 type: string
 *                 example: RM0001
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 */
