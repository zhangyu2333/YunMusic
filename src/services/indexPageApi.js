import request from '../utils/request';

export function banner() {
  return request('http://123.206.55.50:14000/banner');
}
export function RecommendSongListData(){
  return request('http://123.206.55.50:14000/personalized');
}
export function NewSongListData(){
  return request('http://123.206.55.50:14000/personalized/newsong')
}
export function StationData(){
  return request('http://123.206.55.50:14000/personalized/djprogram')
}
export function hotSearch(){
  return request('http://123.206.55.50:14000/search/hot')
}
export function searchSong(val){
  return request(`http://123.206.55.50:14000/search?keywords=${val}`)
}


export function songUrl(id){
  return request(`http://123.206.55.50:14000/song/url?id=${id}`)
}
export function songInfo(id){
  return request(`http://123.206.55.50:14000/song/detail?ids=${id}`)
}


export function AllsongUrl(id){
  return request(`http://123.206.55.50:14000/song/url?id=${id}`)
}
export function AllsongInfo(id){
  return request(`http://123.206.55.50:14000/song/detail?ids=${id}`)
}
export function songLRC(id){
  return request(`http://123.206.55.50:14000/lyric?id=${id}`)
}