import request from '../utils/request';
import cookie from 'js-cookie';
export function getCookie(){
    return cookie.get('user')
}
export function setCookie(info){
    return cookie.set('user',info)
}
export function Userlogin(opt) {
    return request(`http://123.206.55.50:14000/login/cellphone?phone=${opt.userPhone}&password=${opt.pwd}`);
}