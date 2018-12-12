import request from '../utils/request';
import cookie from 'js-cookie';
const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'http://123.206.55.50:14000';
export function getCookie(){
    return cookie.get('user')
}
export function setCookie(info){
    return cookie.set('user',info)
}
export function Userlogin(opt) {
    return request(`${host}/login/cellphone?phone=${opt.userPhone}&password=${opt.pwd}`);
}
export function UserInfo(id) {
    return request(`${host}/user/detail?uid=${id}`);
}
export function My(){
    return request(`${host}/user/subcount`)
}