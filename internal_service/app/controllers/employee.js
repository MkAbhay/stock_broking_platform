const employeeService = require("../services/employee");

const getEmployees = async (req, res, next) => {
  try {
    const data = await employeeService.getEmployees(req.query);

    res.success(200, "Employees fetched successfully", data);
  } catch (err) {
    next(err);
  }
};

module.exports = getEmployees;
