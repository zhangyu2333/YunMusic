import React, { Component } from 'react';

import { NavLink } from 'dva/router';
import RouterView from '../../../routerView/routerView'
import styles from './fondsong.scss';


class FindSong extends Component {
    goSearch(){
        let{
            history:{
                push
            }
        } = this.props;
        push({
            pathname:'/search'
        })
    }
    render() {
        
        return (
            <React.Fragment>
                <header className="header">
                    <div className="search" onClick={this.goSearch.bind(this)}>
                        <div className="icon">
                            <i className="iconfont">&#xe615;</i>
                        </div>
                        <div className="like">
                            猜你喜欢 浮生
                        </div>
                        <div className="icon">
                            <i className="iconfont">&#xe664;</i>
                        </div>
                    </div>
                </header>
                <div className="init">
                    <NavLink to="/IndexPage/FindSong/SelfDom">个性推荐</NavLink>
                    <NavLink to="/IndexPage/FindSong/Recommend">主播电台</NavLink>
                </div>
                <RouterView routes={this.props.routes}></RouterView>
            </React.Fragment>
        );
    }
}

export default FindSong;