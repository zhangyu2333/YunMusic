import React, { Component } from 'react';
import { connect } from 'dva';
import { NavLink } from 'dva/router'
import styles from './IndexPage.scss';
import RouterView from '../../routerView/routerView';


class IndexPage extends Component {
	render() {
		return (
			<div>
				<RouterView routes={this.props.routes}></RouterView>
				<footer className={styles.footer}>
					<NavLink to="/IndexPage/FindSong">
						<i className="iconfont">&#xe601;</i>
						<span>发现</span>
					</NavLink>
					<NavLink to="/IndexPage/SongVideo">
						<i className="iconfont">&#xe608;</i>
						<span>视频</span>
					</NavLink>
					<NavLink to="/IndexPage/My">
						<i className="iconfont">&#xe622;</i>
						<span>我的</span>
					</NavLink>
					<NavLink to="/IndexPage/Friend">
						<i className="iconfont">&#xe7e3;</i>
						<span>朋友</span>
					</NavLink>
					<NavLink to="/IndexPage/Mine">
						<i className="iconfont">&#xe66a;</i>
						<span>账号</span>
					</NavLink>
				</footer>
			</div>
		);
	}
}


export default connect()(IndexPage);
