const axios = require("axios");

/**
 * 随机获取背景
 * @return {Promise<*[]>}
 */
async function getDujitang() {
  const api = "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json";
  return await axios.get(api).then((res) => res.data.text);
}

module.exports = {
  getDujitang,
};
