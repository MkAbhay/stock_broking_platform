const clientService = require("../services/client");

const getClientsById = async (req, res, next) => {
  try {
    const employee_code = req.params.employee_code;
    const data = await clientService.getClientsById(employee_code);

    res.success(200, "Clients fetched successfully", data);
  } catch (err) {
    next(err);
  }
};

module.exports = getClientsById;
