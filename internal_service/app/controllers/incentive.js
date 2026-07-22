const tradeService = require("../services/trade");

const getIncentive = async (req, res, next) => {
  try {
    const data = await tradeService.getIncentive(req.query);

    res.success(200, "Incentive fetched successfully", data);
  } catch (err) {
    next(err);
  }
};

module.exports = getIncentive;
