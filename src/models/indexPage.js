import { 
    banner,
    RecommendSongListData,
    NewSongListData,
    StationData,
    searchSong,
    songlistDetail
} from '../services/indexPageApi';
export default {
    namespace:"indexPage",
    state:{
        findSong:{},
        banner:[],
        RecommendSongListData:{},
        NewSongListData:{},
        StationData:{},
        songs:[],
        songlistDetail:{}
    },
    effects:{
        *getBannerData(_,{ call, put }){
            let res = yield call(async ()=> banner());
            yield put({
                type:"setBannerData",
                payload:res.data.banners
            })
        },
        *getRecommendSongListData(_,{ call, put }){
            let res = yield call(async ()=> RecommendSongListData());
            yield put({
                type:"setRecommendSongListData",
                payload:res.data.result
            })
        },
        *getNewSongListData(_,{ call, put }){
            let res = yield call(async ()=> NewSongListData());
            yield put({
                type:"setNewSongListData",
                payload:res.data.result
            })
        },
        *getStationData(_,{ call, put }){
            let res = yield call(async ()=> StationData());
            yield put({
                type:"setStationData",
                payload:res.data.result
            })
        },
        *getSearchSongData({payload},{ call, put }){
            let res = yield call(searchSong,payload);
            yield put({
                type:"setSearchSongData",
                payload:res.data.result.songs
            })
        },
        *getSonglistDetail({payload},{ call, put }){
            let res = yield call(songlistDetail,payload);
            console.log(res)
            yield put({
                type:"setSonglistDetail",
                payload:res.data.playlist
            })
        }
    },
    reducers:{
        setBannerData(state,{payload}){
            return {...state,banner:payload}
        },
        setRecommendSongListData(state,{payload}){
            return {...state,RecommendSongListData:payload}
        },
        setNewSongListData(state,{payload}){
            return {...state,NewSongListData:payload}
        },
        setStationData(state,{payload}){
            return {...state,StationData:payload}
        },
        setSearchSongData(state,{payload}){
            return {...state,songs:payload}
        },
        setSonglistDetail(state,{payload}){
            return {...state,songlistDetail:payload}
        }
    }
}