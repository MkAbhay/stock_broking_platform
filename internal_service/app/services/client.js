const { logger } = require("../helpers/logger");
const { clients, rm_client_mapping, rm } = require("../models");
const { Op } = require("sequelize");

const getClients = async (query) => {
  try {
    const searchText = query.searchText?.trim() || "";
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 10, 1);
    const offset = (page - 1) * limit;
    const sort = query.sort || "id";
    const order = query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const whereClause = {
      ...(searchText && {
        [Op.or]: [
          { name: { [Op.like]: `%${searchText}%` } },
          { client_code: { [Op.like]: `%${searchText}%` } },
        ],
      }),
    };

    const { count, rows } = await clients.findAndCountAll({
      attributes: ["id", "client_code", "name", "email", "phone", "pan"],
      where: whereClause,
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
      },
    };
  } catch (err) {
    logger.error("Failed to fetch clients data", err.message);
    throw err;
  }
};

const getClientsById = async (employee_code) => {
  try {
    const rows = await clients.findAll({
      attributes: ["id", "client_code", "name", "email", "phone", "pan"],
      include: [
        {
          model: rm_client_mapping,
          as: "rm_mapping",
          attributes: [],
          required: true,
          include: [
            {
              model: rm,
              as: "rm",
              attributes: [],
              required: true,
              where: {
                employee_code: employee_code,
              },
            },
          ],
        },
      ],
    });

    return rows;
  } catch (err) {
    logger.error("Failed to fetch clients data", err.message);
    throw err;
  }
};

module.exports = { getClients, getClientsById };
