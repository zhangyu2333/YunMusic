import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './songListDetail.scss';

@connect((...indexPage)=>({...indexPage}))
class SongListDetail extends Component {
    componentDidMount(){
        let {
            dispatch,
            match:{
                params:{
                    id
                }
            }
        } = this.props;
        dispatch({
            type:"indexPage/getSonglistDetail",
            payload:id
        })
    }
    render() {
        let {
            songlistDetail
        } = this.props[0].indexPage;
        console.log(this.props)
        return (
            <div className={styles.detail}>
                <div className={styles.head}>
                    <div className={styles.blur} style={{backgroundImage:`url(${songlistDetail.coverImgUrl})`}}></div>
                </div>
                <div className={styles.realtitle}>
                    <header className={styles.header}>
                        <div>
                            <i className="iconfont">&#xe64d;</i>
                        </div>
                        
                        <span>歌单</span>
                        <div>
                            <i className="iconfont">&#xe61e;</i>
                            <i className="iconfont">&#xe664;</i>
                        </div>
                    </header>
                    <div className={styles.img}>
                        <div className={styles.imgurl}>
                            <img src={songlistDetail.coverImgUrl} alt=""/>
                        </div>
                        <div className={styles.list}>
                            <h3>{songlistDetail.name}</h3>
                            <div>
                                <img src={songlistDetail.creator && songlistDetail.creator.avatarUrl} alt=""/>
                                <p>{songlistDetail.creator&&songlistDetail.creator.nickname}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.songlist}>
                    <div className={styles.songlist_title}>
                        <p><i className="iconfont">&#xe624;</i>播放全部</p>
                        <div className={styles.buy}>收藏</div>
                    </div>
                    <ul>
                        {
                            songlistDetail.tracks && songlistDetail.tracks.map((v,i) => {
                                return <li key={i}>
                                    <span>{++i}</span><p>{v.name}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default SongListDetail;