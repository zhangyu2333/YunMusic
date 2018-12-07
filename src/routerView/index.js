// import React from 'react';
// import { NavLink } from 'dva/router';
// import RouterView from './routerView';
import IndexPage from '../routes/indexPage/IndexPage';
import FindSong from '../routes/indexPage/findsong/fondsong';
import SelfDom from '../routes/indexPage/findsong/initPage/selfDom/selfdom';
import Recommend from '../routes/indexPage/findsong/initPage/recommend/recommend';

import SongVideo from '../routes/indexPage/songvideo/songvideo';
import My from '../routes/indexPage/my/my';
import Friend from '../routes/indexPage/friend/friend';
import Mine from '../routes/indexPage/mine/mine';
import {Login} from '../routes/login/login'
import LoginPage from '../routes/loginPage/loginPage';
import Search from '../routes/search/search';
import Player from '../routes/player/player';
export default {
    routes:[
        {
            path:"/IndexPage",
            component:IndexPage,
            children:[
                {
                    path:'/IndexPage/FindSong',
                    component:FindSong,
                    children:[
                        {
                            path:"/IndexPage/FindSong/SelfDom",
                            component:SelfDom,
                        },
                        {
                            path:"/IndexPage/FindSong/Recommend",
                            component:Recommend,
                        },
                        {
                            path:"/IndexPage/FindSong",
                            redirect:"/IndexPage/FindSong/SelfDom",
                        }
                    ]
                },
                {
                    path:'/IndexPage/SongVideo',
                    component:SongVideo,
                },
                {
                    path:'/IndexPage/My',
                    component:My,
                },
                {
                    path:'/IndexPage/Friend',
                    component:Friend,
                },
                {
                    path:'/IndexPage/Mine',
                    component:Mine,
                },
                {
                    path:'/IndexPage',
                    redirect: '/IndexPage/FindSong'
                }
            ]
        },
        {
            path:"/detail",
            component:IndexPage
        },
        {
            path:"/play",
            component:IndexPage
        },
        {
            path:"/login",
            component:Login
        },
        {
            path:"/userlogin",
            component:LoginPage
        },
        {
            path:"/search",
            component:Search
        },
        {
            path:"/player",
            component:Player
        },
        {
            path:"/",
            redirect: '/IndexPage'
        }
    ]
}