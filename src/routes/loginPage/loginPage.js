import React, { Component } from 'react';
import styles from './loginPage.scss';
import { connect } from 'dva';

@connect(({...userinfo})=>({...userinfo}))
class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            userPhone:"16619940015",
            pwd:"zy664105"
        }
    }
    login(){
        let {
            userPhone,
            pwd
        } = this.state;
        let {
            dispatch
        } = this.props;
        console.log(this.props)
        dispatch({
            type:"userinfo/login",
            payload:{userPhone,pwd}
        })
    }
    render() {
        let {
            userPhone,
            pwd
        } = this.state;
        return (
            <div className={styles.login}>
                <div className={styles.title}>
                    <i className="iconfont">&#xe64d;</i>
                    <span>手机号登陆</span>
                    <span></span>
                </div>
                <div className={styles.info}>
                    <input type="text" value={userPhone} maxLength="11" placeholder="输入手机号" onChange={(e)=>this.setState({userPhone:e.target.value})}/>
                    <input type="password" value={pwd}  placeholder="输入密码" onChange={(e)=>this.setState({pwd:e.target.value})}/>
                </div>
                <button onClick={this.login.bind(this)}>登陆</button>
            </div>
        );
    }
}

export default LoginPage;