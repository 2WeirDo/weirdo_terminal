const axios = require("axios");

async function getInspire() {
  const api = "https://api.vvhan.com/api/en?type=sj";
  let q = await axios.get(api).then((res) => res.data.data);
  console.log("q: ", q);
  return q;
}

module.exports = {
  getInspire,
};
