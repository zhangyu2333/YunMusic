import React, { Component } from 'react';
import { connect } from 'dva';
import { NavLink } from 'dva/router'
import { Carousel, WingBlank, ListView, PullToRefresh } from 'antd-mobile';
import styles from './selfDom.scss'
import IndexPageItem from '../../../../../components/indexPageItem/indexPageItem'
import RecommendSongList from '../../../../../components/recommendSongList/recommendSongList'
@connect(({...indexPage})=>({...indexPage}))
class SelfDom extends Component {
    constructor(props){
        super(props)
        this.state={
            itemArr:[
                {
                    icon:"&#xe663;",
                    name:'私人FM'
                },
                {
                    icon:"&#xe628;",
                    name:'每日推荐'
                },
                {
                    icon:"&#xe605;",
                    name:'歌单'
                },
                {
                    icon:"&#xe612;",
                    name:'排行榜'
                }
            ],
        }
    }
    componentDidMount(){
        let {
            dispatch
        } = this.props;
        dispatch({
            type:"indexPage/getBannerData"
        })
        dispatch({
            type:"indexPage/getRecommendSongListData"
        })
        dispatch({
            type:"indexPage/getNewSongListData"
        })
        dispatch({
            type:"indexPage/getStationData"
        })
        dispatch({
            type:"userinfo/getUser",
            // payload:window.localStorage.getItem('user')
        })
    }
    render() {
        let {
            indexPage:{
                banner,
                RecommendSongListData,
                NewSongListData,
                StationData
            }
        } = this.props;
        return (
            <div className={styles.scroll}>
                <div className={styles.banner}>
                    <WingBlank>
                        <Carousel
                        autoplay={true}
                        infinite
                        style={{position:'relative',borderRadius:' 0 0 5px 0'}}
                        >
                        {
                            banner.length>0 && banner.map((v,i) => {
                                return <NavLink to="" key={i}>
                                    <img src={v.imageUrl} style={{ width: '100%', verticalAlign: 'top',borderRadius:'5px' }} alt=""/>
                                    <span style={{
                                        background:v.titleColor,
                                        color:'#fff',
                                        padding:'5px',
                                        position:"absolute",
                                        bottom:0,
                                        right:0,
                                        borderRadius:' 0 0 5px 0',
                                        opacity:0.8
                                        }}>{v.typeTitle}</span>
                                </NavLink>
                            })
                        }
                        </Carousel>
                    </WingBlank>
                    <IndexPageItem content={this.state.itemArr}></IndexPageItem>
                    <RecommendSongList title="推荐歌单" RecommendSongListData={ RecommendSongListData }></RecommendSongList>
                    <RecommendSongList title="最新音乐" RecommendSongListData={ NewSongListData }></RecommendSongList>
                    <RecommendSongList title="主播电台" RecommendSongListData={ StationData }></RecommendSongList>
                    
                </div>
            </div>


            
        );
    }
}



export default SelfDom;