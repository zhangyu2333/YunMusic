import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './mine.scss';
@connect((...userinfo)=>({...userinfo}))
class Mine extends Component {
    constructor(){
        super()
        this.state = {
            userInfo:{}
        }
    }
    componentDidMount(){
        this.setState({
            userInfo:JSON.parse(window.localStorage.getItem('userinfo'))
        })
    }
    render() {
        let { 
            userInfo
        } = this.state;
        console.log(userInfo)
        return (
            <div>
                <header className={styles.header}>
                    账号
                    <i className="iconfont">&#xe615;</i>
                </header>
                <div className={styles.userHead}>
                    <img src={userInfo.profile && userInfo.profile.avatarUrl} alt=""/>
                    <div className={styles.userInfo}>
                        <p>{userInfo.profile && userInfo.profile.nickname}</p>
                        <div className={styles.lv}>Lv.{userInfo.level}</div>
                    </div>
                    <span>签到</span>
                </div>
                <ul className={styles.sel}>
                    <li>
                        <p>动态</p>
                        <span>{userInfo.profile && userInfo.profile.gender}</span>
                    </li>
                    <li>
                        <p>关注</p>
                        <span>{userInfo.profile && userInfo.profile.follows}</span>
                    </li>
                    <li>
                        <p>粉丝</p>
                        <span>{userInfo.profile && userInfo.profile.playlistCount}</span>
                    </li>
                    <li>
                        <span><i className="iconfont">&#xe602;</i></span>
                        <p>我的资料</p>
                    </li>
                </ul>
                <ul className={styles.more}>
                    <li>
                        <i className="iconfont">&#xe61d;</i>
                        <span>我的消息</span>
                        <i className="iconfont i">&#xe912;</i>
                    </li>
                    <li>
                        <i className="iconfont">&#xe62e;</i>
                        <span>会员中心</span>
                        <i className="iconfont i">&#xe912;</i>
                    </li>
                    <li>
                        <i className="iconfont">&#xe618;</i>
                        <span>商城</span>
                        <i className="iconfont i">&#xe912;</i>
                    </li>
                    <li>
                        <i className="iconfont">&#xe614;</i>
                        <span>游戏推荐:明日之后</span>
                        <i className="iconfont i">&#xe912;</i>
                    </li>
                    <li>
                        <i className="iconfont">&#xe617;</i>
                        <span>在线听歌免流量</span>
                        <i className="iconfont i">&#xe912;</i>
                    </li>
                    <li>
                        <i className="iconfont">&#xe621;</i>
                        <span>设置</span>
                        <i className="iconfont i">&#xe912;</i>
                    </li>
                    <li>
                        <i className="iconfont">&#xe607;</i>
                        <span>扫一扫</span>
                        <i className="iconfont i">&#xe912;</i>
                    </li>
                    <li>
                        <i className="iconfont">&#xe629;</i>
                        <span>个性换肤</span>
                        <i className="iconfont i">&#xe912;</i>
                    </li>
                    <li>
                        <i className="iconfont">&#xe603;</i>
                        <span>夜间模式</span>
                        <p></p>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Mine;