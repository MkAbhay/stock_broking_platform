const { rm } = require("../models");
const { CustomError } = require("../helpers/CustomError");

const login = async (employee_code) => {
  if (!employee_code)
    throw new CustomError("Employee code is required", 400, "validation_error");

  const employee = await rm.findOne({ where: { employee_code } });

  if (!employee) throw new CustomError("Employee not found", 400, "not_found");

  return {
    id: employee.id,
    employee_code: employee.employee_code,
    name: employee.name,
    role: employee.role,
  };
};

module.exports = { login };
