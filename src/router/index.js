import Vue from 'vue'
import Router from 'vue-router'
import {
  routerMode
} from '@/config/env'
import store from '@/config/store'
Vue.use(Router)
//路由配置
const routes = [{
    path: '/',
    name: 'login',
    component: resolve => require(['@/page/common/login.vue'], resolve)
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/page/common/home.vue'], resolve),
    children: [{
        //商品管理
        path: '/goodsManage',
        component: function (resolve) {
          require(['@/page/goodsManage/index.vue'], resolve)
        }
      },
      {
        //商品管理-添加商品
        path: '/goodsAdd',
        component: function (resolve) {
          require(['@/page/goodsManage/add.vue'], resolve)
        }
      },
      {
        //商品管理-编辑商品
        path: '/goodsDetails/:id',
        component: function (resolve) {
          require(['@/page/goodsManage/details.vue'], resolve)
        }
      },
      {
        //商品管理-拼单设置
        path: '/pindanSet/:id',
        component: function (resolve) {
          require(['@/page/goodsManage/pindanSetting.vue'], resolve)
        }
      },
      {
        //商品管理-拼单管理
        path: '/pindanManage',
        component: function (resolve) {
          require(['@/page/goodsManage/pindanManage.vue'], resolve)
        }
      },
      {
        //商品管理-拼单编辑
        path: '/pindanEdit/:id/:gid/:tid',
        component: function (resolve) {
          require(['@/page/goodsManage/pindanEdit.vue'], resolve)
        }
      },





      {
        //订单管理
        path: '/ordersManage',
        component: function (resolve) {
          require(['@/page/ordersManage/index.vue'], resolve)
        }
      },
      {
        //订单详情
        path: '/ordersDetails/:id',
        component: function (resolve) {
          require(['@/page/ordersManage/details.vue'], resolve)
        }
      },






    ]
  }
];
let router = new Router({
  //模式
  mode: routerMode,
  //代码检查
  // strict: process.env.NODE_ENV !== 'production',
  //页面滚动
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes
});
//页面加载时
router.beforeEach(function (to, from, next) {
  store.commit('setPageLoading', true);
  store.commit('setPath', to.path)
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next();
  }
});
//页面销毁时
router.afterEach(function (to) {
  store.commit('setPageLoading', false);
});
export default router;
