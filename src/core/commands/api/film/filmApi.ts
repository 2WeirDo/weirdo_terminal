import myAxios from '@/plugins/myAxios'

export const getFilm = async () => {
  let res: any = await myAxios.post('/film/get')
  if (res.code === 0) {
    res = res.data
    res = res.map((item: any) => {
      return (
        `⭐: ${item?.info?.pingfen}` +
        `&nbsp&nbsp<a href="${item?.info?.url}" style="color: white; border-bottom: solid 1px pink" target="_blank">${item?.title}</a><br>`
      )
    })
    return res
  }
}
