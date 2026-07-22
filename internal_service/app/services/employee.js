const { logger } = require("../helpers/logger");
const { rm } = require("../models");
const { Op } = require("sequelize");

const getEmployees = async (query) => {
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
          { employee_code: { [Op.like]: `%${searchText}%` } },
        ],
      }),
    };

    const { count, rows } = await rm.findAndCountAll({
      attributes: ["id", "employee_code", "name", "email", "phone"],
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
    logger.error("Failed to fetch rm data", err.message);
    throw err;
  }
};

module.exports = { getEmployees };
