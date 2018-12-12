import React, { Component } from 'react';
import { connect } from 'dva';
import { formatTime } from '../../utils/formatTime'
import styles from './player.scss';
@connect(({...playsong}) =>({...playsong}))

class Player extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:"",
            isPlay:true,
            stop:false,
            progress:0,
            showSongList:false,
            showLRC:false,
            Lrc:[],
            height:0,
            numheight:0,
            playTime:0,
            LrcIndex:0,
        }
    }
    componentDidMount(){
        let {
            dispatch
        } = this.props;
        console.log(this.props)
        this.setState({
            id:window.localStorage.getItem('songid')
        },()=>{
            dispatch({
                type:"playsong/getSongUrl",
                payload:{id:this.state.id,flag:this.props.location.state?this.props.location.state.flag:null}
            })
        }) 
    }
    timeUpdate(){
        let index = this.state.LrcIndex;
        let progress = this.refs.audio.currentTime/this.refs.audio.duration*100;
        let time = +this.refs.audio.currentTime.toFixed(0)
        let flag = true;
        this.state.Lrc.length>0 && this.state.Lrc.map(v=>{
            
            if( time==v[0].toFixed(0) ){
                if(flag){
                    flag = false;
                    index++;
                }
                
            }
        })
        this.setState({
            progress,
            LrcIndex:index,
            height:this.state.numheight-index*8.5
        })
    }

     // 获取总时长
    get duration(){
        if (this.refs.audio && this.refs.audio.duration){
            return formatTime(this.refs.audio.duration);
        }
        return '00:00';
    }

    // 获取当前播放时间
    get currentTime(){
        if (this.refs.audio && this.refs.audio.currentTime){
            return formatTime(this.refs.audio.currentTime);
        }
        return '00:00';
    }
    changePlay(){
        this.setState({
            isPlay:!this.state.isPlay
        },()=>{
            this.state.isPlay?this.refs.audio.play():this.refs.audio.pause();
          })
    }

      // 触摸进度条事件
    touchStart(){
        this.setState({
            isPlay: false
        }, ()=>{
            this.refs.audio.pause();
        })
    }
  // 移动过进度条
    touchMove(e){
        let touch = e.touches[0],
            progressEle = this.refs.progress;
        let progress = (touch.pageX - progressEle.offsetLeft)/progressEle.offsetWidth;
        if (progress>1){
            progress = 1;
        }
        if (progress<0){
            progress = 0;
        }
        this.setState({
            progress: progress*100
        }, ()=>{
            this.refs.audio.currentTime = progress*this.refs.audio.duration
        })
    }
    // 离开进度条
    touchEnd(){
        this.setState({
            isPlay: true
        }, ()=>{
            this.refs.audio.play();
        })
    }
    //改变播放模式

    type(){
        let {
            dispatch
        } = this.props
        dispatch({
            type:"playsong/changePlayType"
        })
    }
    renderType(num){
        switch(num){
            case 0:
                return <i className="iconfont">&#xe6d6;</i>
            case 1:
                return <i className="iconfont">&#xe669;</i>
            case 2:
                return <i className="iconfont">&#xe665;</i>
            case 3:
                return <i className="iconfont">&#xe62c;</i>
            default:
                return <i className="iconfont">&#xe6d6;</i>
        }
    }
    changeSong(type){
        let {
            dispatch,
            playsong
        } = this.props;
        switch(playsong.playType){
            case 1:
                let index = Math.floor(Math.random()*playsong.songlist.length)
                dispatch({
                    type:"playsong/newSongInfo",
                    payload:{index}
                })
                break;
            case 3:
                dispatch({
                    type:"playsong/newSongInfo",
                    payload:{index:playsong.songPlayingIndex}
                })
                break;
            default:
                dispatch({
                    type:"playsong/newSongInfo",
                    payload:{type}
                })
        }
    }
    touchSong(index){
        let {
            dispatch
        } = this.props;
        dispatch({
            type:"playsong/newSongInfo",
            payload:{index}
        })
    }
    componentWillReceiveProps(props){
        if( props.playsong.LRC !== "" ){
            let lyric = props.playsong.LRC;
            let lines = lyric.split('\n');
            let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
            let result = [];
            while (!pattern.test(lines[0])) {
                lines = lines.slice(1);
            }
            lines[lines.length - 1].length === 0 && lines.pop();
            for (let data of lines) {
                let index = data.indexOf(']');
                let time = data.substring(0, index + 1);
                let value = data.substring(index + 1);
                let timeString = time.substring(1, time.length - 2);
                let timeArr = timeString.split(':');
                result.push([parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1]), value]);
            }
            result.sort(function(a, b) {
                return a[0] - b[0];
            });
            this.setState({
                Lrc:result
            })
        }
        
    }
    hideImg(){
        
        this.setState({
            showLRC:true,
        },() => {
            this.setState({
                height:this.refs.scroll.offsetHeight/2,
                numheight:this.refs.scroll.offsetHeight/2
            })
        })
    }
    render() {
        let {
            url,
            info,
            playType,
            songlist,
            songPlayingIndex
        } = this.props.playsong
        return (
            <div className={styles.play}>
                <div style={{
                    backgroundSize:"100% 100%",
                    backgroundImage:`url(${info.al?info.al.picUrl:""})`,
                    filter: 'blur(10px) brightness(50%)',
                }}>
                </div>
                
                    <div className={styles.songlist} style={{height:this.state.showSongList?'500px':'0',transition: '0.8s'}}>
                        <div>
                            <div className={styles.songTitle}>
                                <span onClick={this.type.bind(this)}>{this.renderType(playType)}</span>
                                <p>
                                    {playType===0? "顺序播放":playType===1?"随机播放":playType===2?"列表循环":"单曲循环"}
                                    ({songlist.length})</p>
                            </div>
                            {
                                songlist && songlist.map((v,i) => {
                                    return <div key={i} className={styles.songItem} onClick={()=>this.touchSong(i)}>
                                        <i className="iconfont" style={{color:i===songPlayingIndex? "#f50":""}}>&#xe63d;</i>
                                        <p>{v.details.name}</p>—<span>{v.details.ar[0].name}</span>
                                    </div>
                                })
                            }
                            {
                                this.state.showSongList && <div className={styles.cancle} onClick={()=>this.setState({showSongList:false})}>关闭</div>
                            }
                            
                        </div>
                    </div> 
                
                <div className={styles.playPage}>
                    <div className={styles.header}>
                        <i className="iconfont" onClick={this.props.history.goBack}>&#xe64d;</i>
                        <div className={styles.songName}>
                            <p>{info.name?info.name:""}</p>
                            <span>{info.ar?info.ar[0].name:""}<i className="iconfont">&#xe912;</i></span>
                        </div>
                        <i className="iconfont">&#xe63c;</i>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.activeImg} onClick={this.hideImg.bind(this)} style={{opacity:this.state.showLRC?0:1}}>
                            <img src={info.al?info.al.picUrl:""} alt=""/>
                        </div>
                        {
                            this.state.showLRC && <div className={styles.lrc} onClick={()=>this.setState({showLRC:false})} style={{width:this.state.showLRC?'100%':"",opacity:this.state.showLRC?1:1}}>
                                <div className={styles.scroll} ref="scroll">
                                    <ul style={{top:this.state.height+'px'}}>
                                        {
                                            this.state.Lrc.length > 0 && this.state.Lrc.map((v,i) => {
                                                return <li key={i} style={{color:this.state.LrcIndex==i*-1? 'red':'#fff'}}>
                                                    {v[1]}
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                        }
                        {
                            !this.state.showLRC && <div className={styles.send}>
                                <span><i className="iconfont">&#xe60e;</i></span>
                                <span><i className="iconfont">&#xe62b;</i></span>
                                <span><i className="iconfont">&#xe62e;</i></span>
                                <span><i className="iconfont">&#xe61f;</i></span>
                                <span><i className="iconfont">&#xe61e;</i></span>
                        </div>
                        }
                    </div>
                    
                   
                    <div className={styles.playing}>
                        <span>{this.currentTime}</span>
                        <div onTouchStart={this.touchStart.bind(this)}
                             onTouchMove={this.touchMove.bind(this)}
                             onTouchEnd={this.touchEnd.bind(this)}
                             ref="progress">
                            <span style={{left:`${this.state.progress}%`}}>·</span>
                            <p style={{width:`${this.state.progress}%`}}></p>
                        </div>
                        <span>{this.duration}</span>
                    </div>
                    <div className={styles.control}>
                        <span onClick={this.type.bind(this)}>
                            {this.renderType(playType)}
                        </span>
                        <div>
                            <span onClick={()=>this.changeSong('prev')}><i className="iconfont">&#xe6d4;</i></span>
                            <p onClick={this.changePlay.bind(this)} >
                                {
                                    this.state.isPlay? <i className="iconfont">&#xe627;</i>:<i className="iconfont">&#xe624;</i>
                                }
                            </p>
                            <span onClick={()=>this.changeSong('next')}><i className="iconfont">&#xe6d8;</i></span>
                        </div>
                        <span onClick={()=>this.setState({showSongList:true})}><i className="iconfont">&#xe605;</i></span>
                    </div>
                </div>
                <audio src={url} autoPlay ref="audio" onTimeUpdate={()=>this.timeUpdate()}></audio>
            </div> 
        );
    }
}

export default Player;