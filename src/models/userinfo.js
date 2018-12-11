import { routerRedux } from 'dva/router';
import { setCookie,getCookie,Userlogin,UserInfo,My } from '../services/loginApi';

export default {

	namespace: 'userinfo',
	
	state: {
		leave:0,
		user:{},
		myLike:{}
	},
	
	subscriptions: {
		setup({ dispatch, history }) {  // eslint-disable-line
			return history.listen(({pathname})=>{
				if( pathname==='/login' ){
					return 
				}
				if(pathname!=='/userlogin'){
					if( !getCookie() ){
						dispatch(routerRedux.push({
							pathname:'/login'
						}))
					}
				}
			})
		},
	},

	effects: {
		*login({payload},{call,put}){
			let res = yield call(Userlogin,payload)
			let user = yield call(UserInfo,res.data.account.id)
			setCookie(res.data.account.id)
			yield put(routerRedux.push({
				pathname:"/"
			}))
			yield put({
				type:"user",
				payload:user.data
			})
		},
		*getUser(_,{call,put}){
			let id = getCookie();
			let user = yield call(UserInfo,id)
			window.localStorage.setItem('userinfo',JSON.stringify(user.data))
			console.log(user.data)
			yield put({
				type:"user",
				payload:user.data
			})
		},
		*getLike(_,{call,put}){
			let res = yield call(My)
			console.log(res)
			yield put({
				type:"setLike",
				payload:res
			})
		}
	},

	reducers: {
		user(state,{ payload }){
			return {...state,leave:payload.level,user:payload.profile}
		},
		setLike(state,{ payload }){
			return {...state,myLike:payload}
		}
	},

};
  