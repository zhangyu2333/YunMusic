import React, { Component } from 'react';
import { NavLink } from 'dva/router';
import { songCount } from '../../utils/songCount';
import styles from './recommendSongList.scss';
class RecommendSongList extends Component {
    render() {
        let {
            RecommendSongListData,
            title
        } = this.props;
        return (
            <React.Fragment>
                <h3>{title}<i className="iconfont">&#xe912;</i></h3>
                <div className={styles.Recommend}>
                    {
                        RecommendSongListData.length>0 && RecommendSongListData.map((v,i) => {
                            if( i>=6 ){
                                return 
                            }
                            return <div key={i} className={styles.Recommend_item}>
                                <NavLink to="">
                                    <img src={v.picUrl?v.picUrl:v.song.album.picUrl} alt=""/>
                                    <p>{v.name}</p>
                                    <div className={styles.playCount}>
                                        {
                                            v.playCount? <i className="iconfont">&#xe664;</i>:""
                                        }
                                        <span>{v.playCount? songCount(v.playCount):""}</span>
                                    </div>
                                </NavLink>
                            </div>
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default RecommendSongList;