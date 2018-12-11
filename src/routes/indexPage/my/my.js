import React, { Component } from 'react';
import { connect } from 'dva';
@connect(({...userinfo}) =>({...userinfo}))
class My extends Component {
    componentDidMount(){
        let {
            dispatch
        } = this.props;
        dispatch({
            type:"userinfo/getLike"
        })
    }
    render() {
        return (
            <div>
                <header>
                    <i className="iconfont"></i>
                    <span>我的音乐</span>
                    <i className="iconfont"></i>
                </header>
            </div>
        );
    }
}

export default My;