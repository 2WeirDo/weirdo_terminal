const axios = require("axios");

async function getFilm() {
  const api = "https://api.vvhan.com/api/douban";
  return await axios.get(api).then((res) => res.data.data);
}
module.exports = {
  getFilm,
};
