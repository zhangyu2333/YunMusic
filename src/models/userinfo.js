import { routerRedux } from 'dva/router';
import { setCookie,getCookie,Userlogin } from '../services/loginApi'
export default {

	namespace: 'userinfo',
	
	state: {},
	
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
			setCookie(res.data.account.id)
			yield put(routerRedux.push({
				pathname:"/"
			}))
		}
	},

	reducers: {
	
	},

};
  