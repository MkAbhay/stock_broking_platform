const { rm } = require("../../app/models");
const { getRmBse } = require("./api_call");
const retry = require("./retry");
const { logger } = require("../../app/helpers/logger");

const sync_rm = async () => {
  // Fetch rm data from BSE
  const rm_data = await retry(() => getRmBse())
    .then((res) => res.data)
    .catch((err) => {
      logger.error("Failed to fetch rm data from bse", err.message);
    });

  if (rm_data && rm_data.length > 0) {
    // Sync rm bulk upsert at once
    const records = rm_data.map((rm) => ({
      id: rm.id,
      employee_code: rm.employee_code,
      name: rm.name,
      email: rm.email,
      phone: rm.phone,
    }));
    await rm.bulkCreate(records, {
      updateOnDuplicate: ["name", "email", "phone"],
    });
    logger.info("rm data synced to database");
  }

  return true;
};

module.exports = sync_rm;
