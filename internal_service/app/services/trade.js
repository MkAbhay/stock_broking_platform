const { logger } = require("../helpers/logger");
const { trades, clients, sequelize } = require("../models");
const { Op } = require("sequelize");

const getTrades = async (query) => {
  try {
    const searchText = query.searchText?.trim() || "";
    const startDate = query.startDate ? new Date(query.startDate) : null;
    const endDate = query.endDate ? new Date(query.endDate) : null;
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 10, 1);
    const offset = (page - 1) * limit;
    const sort = query.sort || "id";
    const order = query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const whereClause = {
      ...(startDate || endDate
        ? {
            date: {
              ...(startDate && { [Op.gte]: startDate }),
              ...(endDate && { [Op.lte]: endDate }),
            },
          }
        : {}),
    };

    const { count, rows } = await trades.findAndCountAll({
      distinct: true,
      attributes: ["id", "trade_id", "date", "symbol", "quantity", "price"],
      where: whereClause,
      include: [
        {
          model: clients,
          as: "client",
          attributes: ["id", "client_code", "name", "email", "phone", "pan"],
          where: {
            ...(searchText && {
              [Op.or]: [
                { name: { [Op.like]: `%${searchText}%` } },
                { client_code: { [Op.like]: `%${searchText}%` } },
              ],
            }),
          },
          required: true,
        },
      ],
      limit,
      offset,
      order: [[sort, order]],
    });

    return {
      data: rows,
      pagination: {
        page,
        limit,
        size: rows.length,
        total: count,
        totalPages: Math.ceil(count / limit),
        hasNext: page * limit < count,
        hasPrevious: page > 1,
      },
      filters: {
        searchText,
        startDate,
        endDate,
      },
    };
  } catch (err) {
    logger.error("Failed to fetch trades data", err.message);
    throw err;
  }
};

const getIncentive = async (query) => {
  try {
    const searchText = query.searchText?.trim() || "";
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 10, 1);
    const offset = (page - 1) * limit;

    const replacements = {
      searchText: `%${searchText}%`,
      limit,
      offset,
    };

    const countQuery = `
        SELECT COUNT(DISTINCT rm.id) AS total
        FROM rm
        INNER JOIN rm_client_mapping rcm 
            ON rcm.rm_id = rm.id
        INNER JOIN clients c 
            ON c.id = rcm.client_id
        INNER JOIN trades t 
            ON t.client_id = c.id
        WHERE 
            (:searchText = '%%'
            OR rm.name LIKE :searchText
            OR rm.employee_code LIKE :searchText);
    `;

    const dataQuery = `
        SELECT 
            rm.id,
            rm.employee_code,
            rm.name,
            rm.email,
            rm.phone,
            COALESCE(SUM(t.brokerage), 0) AS total_brokerage
        FROM rm
        INNER JOIN rm_client_mapping rcm 
            ON rcm.rm_id = rm.id
        INNER JOIN clients c 
            ON c.id = rcm.client_id
        INNER JOIN trades t 
            ON t.client_id = c.id
        WHERE 
            (:searchText = '%%'
            OR rm.name LIKE :searchText
            OR rm.employee_code LIKE :searchText)
        GROUP BY rm.id
        ORDER BY rm.id ASC
        LIMIT :limit OFFSET :offset;
    `;

    const [countResult, rows] = await Promise.all([
      sequelize.query(countQuery, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query(dataQuery, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      }),
    ]);
    const count = Number(countResult[0].total);

    return {
      data: rows,
      pagination: {
        page,
        limit,
        size: rows.length,
        total: count,
        totalPages: Math.ceil(count / limit),
        hasNext: page * limit < count,
        hasPrevious: page > 1,
      },
      filters: {
        searchText,
      },
    };
  } catch (err) {
    logger.error("Failed to fetch incentive data", err.message);
    throw err;
  }
};

const getIncentiveById = async (employee_code) => {
  try {
    const sql = `
      SELECT 
        rm.id,
        rm.employee_code,
        rm.name,
        rm.email,
        rm.phone,
        COALESCE(SUM(t.brokerage), 0) AS total_brokerage
      FROM rm
      INNER JOIN rm_client_mapping rcm
        ON rcm.rm_id = rm.id
      INNER JOIN clients c
        ON c.id = rcm.client_id
      INNER JOIN trades t
        ON t.client_id = c.id
      WHERE rm.employee_code = :employee_code
      GROUP BY rm.id
    `;

    const [result] = await sequelize.query(sql, {
      replacements: {
        employee_code,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  } catch (err) {
    logger.error("Failed to fetch trades data", err.message);
    throw err;
  }
};

module.exports = { getTrades, getIncentive, getIncentiveById };
