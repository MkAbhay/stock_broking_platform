const { getTradesBse } = require("./api_call");
const retry = require("./retry");
const fetchLastTradeDate = require("./fetchLastTradeDate");
const { logger } = require("../../app/helpers/logger");
const { trades } = require("../../app/models");

const sync_trades = async () => {
  // Fetch trades data from BSE
  const last_trade_date = await fetchLastTradeDate();
  const trades_data = await retry(() => getTradesBse(last_trade_date))
    .then((res) => res.data)
    .catch((err) => {
      logger.error("Failed to fetch trades data from bse", err.message);
    });

  if (trades_data && trades_data.length > 0) {
    // Sync trades bulk upsert at once
    const records = trades_data.map((trade) => ({
      id: trade.id,
      trade_id: trade.trade_id,
      client_id: trade.client_id,
      date: new Date(trade.date),
      symbol: trade.symbol,
      quantity: trade.quantity,
      price: trade.price,
      brokerage: trade.quantity * trade.price * 0.02, // 2% brokerage
    }));
    await trades.bulkCreate(records, {
      updateOnDuplicate: [
        "client_id",
        "date",
        "symbol",
        "quantity",
        "price",
        "brokerage",
      ],
    });
    logger.info("Trades data synced to database");
  }

  return true;
};

module.exports = sync_trades;
