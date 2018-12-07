import React, { Component } from 'react';
import { NavLink } from 'dva/router'
import styles from './indexPageItem.scss'
class IndexPageItem extends Component {
    render() {
        let {
            content
        } = this.props;
        return (
            <div className={styles.select}>
                <NavLink to="">
                    <i className="iconfont">&#xe663;</i>
                    <span>{content[0].name}</span>
                </NavLink>
                <NavLink to="">
                    <i className="iconfont">&#xe628;</i>
                    <span>{content[1].name}</span>
                </NavLink>
                <NavLink to="">
                    <i className="iconfont">&#xe605;</i>
                    <span>{content[2].name}</span>
                </NavLink>
                <NavLink to="">
                    <i className="iconfont">&#xe612;</i>
                    <span>{content[3].name}</span>
                </NavLink>
            </div>
        );
    }
}

export default IndexPageItem;