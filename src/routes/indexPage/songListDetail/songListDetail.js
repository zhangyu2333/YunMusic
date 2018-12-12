import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
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
    playAll(idArr){
        let urlArr = idArr.map((v) => {
            return v.id
        })
        window.localStorage.setItem('songid',urlArr[0])
        let {
            dispatch,
        } = this.props;
        dispatch({
            type:"playsong/getSongListURL",
            payload:urlArr
        })
        this.props.history.push({
            pathname:'/player'
        })
        
    }
    goPlay(id){
        window.localStorage.setItem('songid',id)
        let {
            history:{
                push
            }
        } = this.props;
        push({
            pathname:"/player",
            state:{id:id,flag:true}
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
                        <div onClick={this.props.history.goBack}>
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
                    <div className={styles.songlist}>
                        <div className={styles.songlist_title}>
                            <p onClick={() =>this.playAll(songlistDetail.trackIds)}><i className="iconfont">&#xe624;</i>播放全部</p>
                            <div className={styles.buy}>+收藏({(songlistDetail.subscribedCount/10000).toFixed(1)}万)</div>
                        </div>
                        <ul>
                            {
                                songlistDetail.tracks && songlistDetail.tracks.map((v,i) => {
                                    return <li key={i} onClick={() =>this.goPlay(v.id)}>
                                        <span>{++i}</span>
                                        <div>
                                            <h5>{v.name}</h5>
                                            <p>{v.ar[0].name}-{v.al.name}</p>
                                        </div>
                                        <i className="iconfont">&#xe61e;</i>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SongListDetail;