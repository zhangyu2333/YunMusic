import React, { Component } from 'react';
import { hotSearch } from '../../services/indexPageApi';
import styles from './search.scss';
import { connect } from 'dva';
@connect(({...indexPage}) =>({...indexPage}))
class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            hotData:[],
            iptVal:"",
            hotShow:true
        }
    }
    componentDidMount(){
        hotSearch().then((res) => {
            this.setState({
                hotData:res.data.result.hots,
                iptVal:res.data.result.hots[0].first
            })
        });
    }
    searchAction(e){
        let {
            dispatch
        } = this.props;
        if(e.keyCode===13){
            if( this.state.iptVal==="" ){
                return
            }
            window._hmt.push(["_trackEven","网易云音乐","搜素"])
            dispatch({
                type:"indexPage/getSearchSongData",
                payload:this.state.iptVal
            })
            this.setState({
                hotShow:!this.state.hotShow
            })
        }
    }
    goPlay(id){
        let {
            history:{
                push
            }
        } = this.props;
        push({
            pathname:"/player",
            state:{id:id,flag:true}
        })
        window.localStorage.setItem('songid',id);
    }
    playAll(id){
        let {
            dispatch
        } = this.props;
        dispatch({
            type:"playsong/getSongListURL",
            payload:this.props.indexPage.songs.map(v=>v.id)
        })
        this.props.history.push({
            pathname:"/player",
            state:id
        })
        window.localStorage.setItem('songid',id);
    }
    render() {
        let {
            hotData,
            iptVal,
            hotShow
        } = this.state;
        let {
            songs
        } = this.props.indexPage
        return (
            <div className={styles.song}>
                <div className={styles.title}>
                    <input type="text" value={iptVal} onChange={(e)=>{this.setState({iptVal:e.target.value})}} onKeyUp={this.searchAction.bind(this)} />
                    <span onClick={()=>{this.setState({iptVal:"",hotShow:true})}}>取消</span>
                </div>
                {hotShow?<div>
                    
                    <h4>热门搜索</h4>
                    <div className={styles.hot}>
                        {
                            hotData.length>0 && hotData.map((v,i) => {
                                return <p key={i} onClick={() =>{this.setState({iptVal:v.first})}}>
                                    {v.first}
                                </p>
                            })
                        }
                </div>
                </div> : <div className={styles.songlist}>
                        <div style={{fontSize:'16px',lineHeight:'30px'}} onClick={() => this.playAll(songs[0].id)}>
                            播放全部
                            <i className="iconfont" style={{paddingLeft:'15px'}}>&#xe622;</i>
                        </div>
                    {
                        songs.length > 0 && songs.map((v,i) => {
                            return <div key={i} className={styles.songItem} onClick={() =>this.goPlay(v.id)}>
                                <p>{v.name}</p>
                                <p>------{v.artists[0].name}</p>
                            </div>
                        })
                    }
                </div>  }
            </div>
        );
    }
}

export default Search;