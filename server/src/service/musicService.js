// 业务逻辑层
import { searchMusics } from '../thirdpart/musicApi.js'

async function getSingleMusic(keywords) {
  const songs = await searchMusics(keywords, 1)
  if (songs.length < 1) {
    return null
  }
  return songs[0]
}

export {
  getSingleMusic
}
