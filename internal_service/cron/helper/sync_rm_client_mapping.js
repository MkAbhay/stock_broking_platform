const { rm_client_mapping } = require("../../app/models");
const { getRmClientMappingBse } = require("./api_call");
const retry = require("./retry");
const { logger } = require("../../app/helpers/logger");

const sync_rm_client_mapping = async () => {
  // Fetch rm_client_mapping data from BSE
  const rm_client_mapping_data = await retry(() => getRmClientMappingBse())
    .then((res) => res.data)
    .catch((err) => {
      logger.error(
        "Failed to fetch rm_client_mapping data from bse",
        err.message,
      );
    });

  if (rm_client_mapping_data && rm_client_mapping_data.length > 0) {
    // Sync rm_client_mapping bulk upsert at once
    const records = rm_client_mapping_data.map((rcm) => ({
      id: rcm.id,
      client_id: rcm.client_id,
      rm_id: rcm.rm_id,
    }));
    await rm_client_mapping.bulkCreate(records, {
      updateOnDuplicate: ["id", "client_id", "rm_id"],
    });
    logger.info("rm_client_mapping data synced to database");
  }

  return true;
};

module.exports = sync_rm_client_mapping;
