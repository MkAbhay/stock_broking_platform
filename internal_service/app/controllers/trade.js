const tradeService = require("../services/trade");

const getTrades = async (req, res, next) => {
  try {
    const data = await tradeService.getTrades(req.query);

    res.success(200, "Trades fetched successfully", data);
  } catch (err) {
    next(err);
  }
};

module.exports = getTrades;
