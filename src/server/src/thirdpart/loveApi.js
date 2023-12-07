const axios = require("axios");

/**
 * 随机获取情话
 * @return {Promise<*[]>}
 */
async function getLove() {
  const api = "https://api.vvhan.com/api/love?type=json";
  return await axios.get(api).then((res) => res.data.ishan);
}

module.exports = {
  getLove,
};
