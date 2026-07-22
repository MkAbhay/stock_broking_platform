const trades_data = require("../seeder/trades.json");

const trades = async (filters) => {
  const { client_code, start_date, end_date } = filters;
  let filteredTrades = [...trades_data];

  // simulate delay
  let delayMs = parseInt(process.env.DELAY_MS);
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  // simulate failure
  let failureRate = parseFloat(process.env.FAILURE_RATE);
  if (Math.random() < failureRate) {
    let error = new Error("simulatedFailure");
    error.status = 500;
    error.message = "Simulated failure occurred while fetching trades";
    throw error;
  }

  // filter trades data based on query parameters
  if (client_code) {
    filteredTrades = filteredTrades.filter(
      (trade) => trade.client_code === client_code,
    );
  }
  if (start_date) {
    filteredTrades = filteredTrades.filter(
      (trade) => new Date(trade.date) >= new Date(start_date),
    );
  }
  if (end_date) {
    filteredTrades = filteredTrades.filter(
      (trade) => new Date(trade.date) <= new Date(end_date),
    );
  }
  // sort trades by trade_date in descending order
  filteredTrades.sort((a, b) => new Date(b.date) - new Date(a.date));

  return filteredTrades;
};

module.exports = trades;
