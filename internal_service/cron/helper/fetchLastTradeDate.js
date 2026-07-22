const { trades } = require("../../app/models");

const fetchLastTradeDate = async () => {
  const lastTrade = await trades.findOne({
    order: [["date", "DESC"]],
  });
  return lastTrade ? lastTrade.date.toISOString() : null;
};

module.exports = fetchLastTradeDate;
