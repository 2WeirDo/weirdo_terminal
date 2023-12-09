// 业务逻辑层
import { searchMusics } from '../thirdpart/musicApi.js'

/**
 * 获取单首音乐
 * @param keywords
 */
async function getSingleMusic(keywords) {
  const songs = await searchMusics(keywords, 1)
  if (songs.length < 1) {
    return null
  }
  return songs[0]
}

/**
 * 获取歌单详情
 * @returns {Promise<ITrackElement>}
 */
// async function getPlaylistDetail() {
//   return await playlistDetail();
// }

export {
  getSingleMusic
}
