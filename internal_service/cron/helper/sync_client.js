const { clients } = require("../../app/models");
const { getClientsBse } = require("./api_call");
const retry = require("./retry");
const { logger } = require("../../app/helpers/logger");

const sync_client = async () => {
  // Fetch clients data from BSE
  const clients_data = await retry(() => getClientsBse())
    .then((res) => res.data)
    .catch((err) => {
      logger.error("Failed to fetch clients data from bse", err.message);
    });

  if (clients_data && clients_data.length > 0) {
    // Sync clients bulk upsert at once
    const records = clients_data.map((client) => ({
      id: client.id,
      client_code: client.client_code,
      name: client.name,
      email: client.email,
      phone: client.phone,
      pan: client.pan,
    }));
    await clients.bulkCreate(records, {
      updateOnDuplicate: ["name", "email", "phone", "pan"],
    });
    logger.info("Clients data synced to database");
  }

  return true;
};

module.exports = sync_client;
