const sync_client = require("./helper/sync_client");
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
    } catch (error) {
      console.error("Error syncing BSE data", error.message);
    }
    await sleep(10000); // wait 10 seconds
  }
}

module.exports = {
  demon,
  running,
};
