import { songUrl,songInfo,AllsongInfo,AllsongUrl,songLRC } from '../services/indexPageApi';
export default {

	namespace: 'playsong',
	
	state: {
        url:{},
        info:{},
        songlist:[],
        playType:0,
        id:'',
        songPlayingIndex:0,
        LRC:""
    },
	
	subscriptions: {
		
	},

	effects: {
		*getSongUrl({ payload },{ call, put }) {
            let AllInfo = []
            let list = JSON.parse(window.localStorage.getItem('songlist'))
            let url = yield call( songUrl,payload.id )
            let info = yield call( songInfo,payload.id )
            let lrc = yield call( songLRC,payload.id )
            console.log(list)
            AllInfo.push({
                urls:url.data.data[0],
                details:info.data.songs[0]
            })
            yield put({
                type:"setUrl",
                payload:AllInfo[0]
            })
            if( payload.flag ){
                yield put({
                    type:"setSongList",
                    payload:AllInfo
                })
            }
            
            yield put({
                type:"setSongLRC",
                payload:lrc.data.lrc.lyric
            })
        },
        *getSongListURL({ payload },{ call,put }){
            let songList = [];
            let All_Url = yield call(AllsongUrl,payload.join(','))
            let All_info = yield call(AllsongInfo,payload.join(','))
            
            All_info.data.songs.forEach((v) => {
                songList.push({
                    urls:All_Url.data.data.filter(val=>v.id===val.id)[0],
                    details:All_info.data.songs.filter(val=>v.id===val.id)[0]
                })
            })
            window.localStorage.setItem('songlist',JSON.stringify(songList))
            yield put({
                type:"setSongList",
                payload:songList
            })
        },
        *newSongInfo({ payload },{ call,put,select }){
            let store = yield select(state=>state);
            let urls,
                index = store.playsong.songPlayingIndex,
                details = {},
                songInfo = {},
                lrc;
            if( payload.type ){
                if( payload.type==="prev" ){
                    index--;
                    if( index < 0){
                        index = 0;
                    }
                }else{
                    index++;
                    if( index > store.playsong.songlist.length-1){
                        index = store.playsong.songlist.length-1;
                    }
                } 
            }else{
                index = payload.index;
            }
            lrc = yield call(songLRC,store.playsong.songlist[index].urls.id)
            urls = store.playsong.songlist[index].urls;
            details = store.playsong.songlist[index].details;
            songInfo = {
                urls,
                details
            }
            yield put({
                type:"setUrl",
                payload:songInfo
            })
            yield put({
                type:"setSongPlayingIndex",
                payload:index
            })
            yield put({
                type:"setSongLRC",
                payload:lrc.data.lrc.lyric
            })
        }
	},

	reducers: {
        setUrl(state,{payload}){
            console.log(payload)
            return {...state,url:payload.urls.url,info:payload.details}
        },
        changePlayType(state){
            return {...state,playType:(state.playType+=1)%4}
        },
        setSongList(state,{payload}){
            console.log(payload)
            return {...state,songlist:payload}
        },
        setSongPlayingIndex(state,{payload}){
            return {...state,songPlayingIndex:payload}
        },
        setSongLRC(state,{payload}){
            return {...state,LRC:payload}
        }
	},

};
  