const authService = require("../services/auth");

const login = async (req, res, next) => {
  try {
    const { employee_code } = req.body;

    const data = await authService.login(employee_code);

    res.success(200, "Login successfully", data);
  } catch (err) {
    next(err);
  }
};

module.exports = login;
