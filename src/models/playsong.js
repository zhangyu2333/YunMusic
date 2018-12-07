import { songUrl,songInfo,AllsongInfo,AllsongUrl } from '../services/indexPageApi';
export default {

	namespace: 'playsong',
	
	state: {
        url:{},
        info:{},
        songlist:[],
        playType:0,
        id:'',
        songPlayingIndex:0,
    },
	
	subscriptions: {
		
	},

	effects: {
		*getSongUrl({ payload },{ call, put }) {
            let AllInfo = []
            let url = yield call( songUrl,payload )
            let info = yield call( songInfo,payload )
            console.log(url)
            AllInfo.push({
                urls:url.data.data[0],
                details:info.data.songs[0]
            })
            yield put({
                type:"setUrl",
                payload:AllInfo[0]
            })
            yield put({
                type:"setSongList",
                payload:AllInfo
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
            console.log(songList)
            yield put({
                type:"setSongList",
                payload:songList
            })
        },
        *newSongInfo({ payload },{ call,put,select }){
            let store = yield select(state=>state);
            console.log(store)
            let urls,
                index = store.playsong.songPlayingIndex,
                details = {},
                songInfo = {};
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
            return {...state,songlist:payload}
        },
        setSongPlayingIndex(state,{payload}){
            return {...state,songPlayingIndex:payload}
        }
	},

};
  