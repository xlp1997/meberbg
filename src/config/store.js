import Vue from 'vue';
import Vuex from 'vuex';
import {
  setStore,
  getStore,
  removeStore,
  modifyJson
} from '@/config/mUtils'
import {
  authority
} from "@/config/authority";
Vue.use(Vuex)
//全局变量
const state = {
  //页面加载时
  pageLoading: false,
  //数据加载时
  dataLoading: false,
  //当前页面路径
  routerUrl: '',
  //用户信息
  userInfo: {},
  //页面数据储存
  pageData: {},
  newdata: [],
  badge: 0,
  badge2: 0
}
//缓存浏览器的数据名称
const cacheNameList = ["userInfo", "pageData", "newdata"];
//数据处理
const mutations = { //触发状态
  //取出缓存数据
  setCacheData(state) {
    for (var item of cacheNameList) {
      let getData = sessionStorage.getItem(item);
      if (getData) {
        state[item] = JSON.parse(getData);
      }
    }
  },
  //页面加载时
  setPageLoading(state, payload) {
    state.pageLoading = payload;
  },
  //数据加载时
  setDataLoading(state, payload) {
    state.dataLoading = payload;
  },
  //当前页面路径
  setPath(state, payload) {
    state.routerUrl = payload;
  },
  //储存用户信息
  setUserInfo(state, payload) {
    if (payload) {
      state.userInfo = modifyJson(payload, state.userInfo);
      setStore('userInfo', state.userInfo);
      state.newdata = authority(payload.menuList);
      setStore('newdata', state.newdata);
    }
  },
  //页面数据储存
  setPageData(state, payload) {
    if (payload) {
      state.pageData = modifyJson(payload, state.pageData);
      setStore('pageData', state.pageData);
    }
  },
  // 对数字角标操作
  jianBadge2: (state) => {

    state.badge2 -= 1;
  },
  jianBadge: (state) => {
    state.badge -= 1;
  }
}
//异步处理
const actions = {

}
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
})
