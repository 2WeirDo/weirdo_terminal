import myAxios from '@/plugins/myAxios'

function formatTechInfo(obj:any) {
  let output = `${obj.title} ${obj.url}<br>`
  output += `* 检测到使用的技术数量: ${obj.total}<br>`
  output += `* 主机信息: ${obj.host.ip} ${obj.host.dz}<br>`
  output += '* 使用的技术<br>'

  // @ts-ignore
  obj.technologies.forEach((tech, index) => {
    let techString = `${index + 1}. <a href="${
      tech.website
    }" target="_blank" style="color: white; border-bottom : solid 1px pink ">${tech.name}</a>`

    if (tech.description) {
      techString += `:&nbsp${tech.description}`
    }
    output += `&nbsp&nbsp${techString}<br>`
  })

  return output
}

export const getAnalyze = async (link: string) => {
  let res:any = await myAxios.post('/analyze/get', { link })
  if(res.code === 0) {
    res = res.data;
    res = formatTechInfo(res);
    return res;
  } else return null;
}
