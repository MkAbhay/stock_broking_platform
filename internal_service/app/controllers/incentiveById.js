const tradeService = require("../services/trade");

const getIncentiveById = async (req, res, next) => {
  try {
    const employee_code = req.params.employee_code;
    const data = await tradeService.getIncentiveById(employee_code);

    res.success(200, "Incentive fetched successfully", data);
  } catch (err) {
    next(err);
  }
};

module.exports = getIncentiveById;
