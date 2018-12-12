import request from '../utils/request';
const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'http://123.206.55.50:14000';
export function banner() {
  return request(`${host}/banner`);
}
export function RecommendSongListData(){
  return request(`${host}/personalized`);
}
export function NewSongListData(){
  return request(`${host}/personalized/newsong`)
}
export function StationData(){
  return request(`${host}/personalized/djprogram`)
}
export function hotSearch(){
  return request(`${host}/search/hot`)
}
export function searchSong(val){
  return request(`${host}/search?keywords=${val}`)
}


export function songUrl(id){
  return request(`${host}/song/url?id=${id}`)
}
export function songInfo(id){
  return request(`${host}/song/detail?ids=${id}`)
}


export function AllsongUrl(id){
  return request(`${host}/song/url?id=${id}`)
}
export function AllsongInfo(id){
  return request(`${host}/song/detail?ids=${id}`)
}
export function songLRC(id){
  return request(`${host}/lyric?id=${id}`)
}
export function songlistDetail(id){
  return request(`${host}/playlist/detail?id=${id}`)
}
