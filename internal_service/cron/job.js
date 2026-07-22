const sync_client = require("./helper/sync_client");
const sync_rm = require("./helper/sync_rm");
const sync_rm_client_mapping = require("./helper/sync_rm_client_mapping");
const sync_trades = require("./helper/sync_trades");

let running = true;

process.on("SIGINT", () => {
  console.log("Stopping demon...");
  running = false;
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function demon() {
  while (running) {
    try {
      await sync_client();

      await sync_trades();

      await sync_rm();

      await sync_rm_client_mapping();
    } catch (error) {
      console.error("Error syncing BSE data", error.message);
    }
    await sleep(30 * 60 * 1000); // sleep for 30 minutes
  }
}

module.exports = {
  demon,
  running,
};
