const clientService = require("../services/client");

const getClients = async (req, res, next) => {
  try {
    const data = await clientService.getClients(req.query);

    res.success(200, "Clients fetched successfully", data);
  } catch (err) {
    next(err);
  }
};

module.exports = getClients;
