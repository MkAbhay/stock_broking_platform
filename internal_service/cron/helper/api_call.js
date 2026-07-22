const axios = require("axios");

const getClientsBse = async () => {
  const url = `${process.env.BSE_URL}/clients`;

  const response = await axios.get(
    url,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    //   { timeout: 30000 },
  );

  return response.data;
};

const getTradesBse = async (last_date) => {
  const url = `${process.env.BSE_URL}/trades?start_date=${last_date ? last_date : ""}`;

  const response = await axios.get(
    url,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    //   { timeout: 30000 },
  );

  return response.data;
};

module.exports = {
  getClientsBse,
  getTradesBse,
};
