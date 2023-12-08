const axios = require('axios')

/**
 * 获取网站技术信息
 * @return {Promise<*[]>}
 */
function formatTechInfo(obj) {
  let output = `${obj.title} ${obj.url}<br>`;
  output += `* 检测到使用的技术数量: ${obj.total}<br>`;
  output += `* 主机信息: ${obj.host.ip} ${obj.host.dz}<br>`;
  output += "* 使用的技术<br>";

  obj.technologies.forEach((tech, index) => {
    let techString = `${index + 1}. <a href="${tech.website}" target="_blank" style="color: white; border-bottom : solid 1px pink ">${tech.name}</a>`;

    if (tech.description) {
      techString += `:&nbsp${tech.description}`;
    }
    output += `&nbsp&nbsp${techString}<br>`;
  });

  return output;
}

async function getAnalyze(link) {
  if (!link) return null
  const api = `https://api.asilu.com/php/web-info.php?url=${link}`
  let q = await axios.get(api).then(res => res.data);
  q = formatTechInfo(q);
  return q;
}

module.exports = {
  getAnalyze
}
