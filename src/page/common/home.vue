<template>
  <div id="app" class="normal">
    <!--导航关闭操作-->
    <el-popover
      ref="navContentClose"
      v-model="closePopover"
      popper-class="popoverbox"
      placement="bottom"
      width="130"
      trigger="click"
    >
      <div class="userList">
        <ul>
          <li @click="closeOther('current')">关闭当前选项卡</li>
          <li class="topBorder"></li>
          <li @click="closeWhole">关闭全部选项卡</li>
          <li @click="closeOther">关闭其他选项卡</li>
        </ul>
      </div>
    </el-popover>
    <header :class="{'lite':pattern}">
      <div class="logo">
        <h3 class="businessName">银弹科技-商家管理</h3>
      </div>
      <div class="head_right">
        <ul>
          <li @click="pattern = !pattern">
            <i class="iconfont icon-icon-test"></i>
          </li>
        </ul>
        <ul>
          <li @click="signOut">
            <i class="iconfont icon-tuichu"></i>
          </li>
        </ul>
      </div>
    </header>
    <!--右边导航-->
    <div :class="['left_nav',{'lite':pattern}]" :style="{height: conentHeight+'px'}">
      <!-- <div class="userImage">
    		<div class="Image">
    			<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3563006298,3265852372&fm=27&gp=0.jpg"/>
    		</div>
    		<div class="userName">
    			<p>小灰灰</p>
    			<div>
    				<span>超级管理员</span>
    			</div>
    		</div>
      </div>-->
      <nav>
        <ul>
          <li v-for="(itme,index) of newdata" :class="{'current': leftNavState == index}">
            <div @click="navclick(index)">
              <i :class="[itme.leftIcon,'navicon iconfont']"></i>
              <span class="name">
                <el-badge
                  v-if="itme.name=='提现审核'"
                  :max="99"
                  :value="badge"
                  class="itemBadge"
                >{{itme.name}}</el-badge>
                <el-badge
                  v-else-if="itme.name=='意见反馈'"
                  :max="99"
                  :value="badge2"
                  class="itemBadge"
                >{{itme.name}}</el-badge>
                <span v-else>{{itme.name}}</span>
              </span>
              
              <span class="tagging" v-if="itme.tagging">{{itme.tagging}}</span>
              <i class="iconfont icon-right arrow" v-else-if="itme.href"></i>
              <i class="iconfont icon-xia direction" v-else></i>
            </div>
            <ul :style="{height: itme.height+'px'}">
              <li
                v-for="(newitme,newindex) of itme.list"
                :class="{'current':newitme.href == routerUrl}"
                @click="leftItme(newitme.name,newitme.href)"
              >{{newitme.name}}</li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    <div :class="['nav_conent',{'lite':pattern}]" ref="nav_conent">
      <div class="operation leftShift" @click="leftShift">
        <i class="iconfont icon-icon4"></i>
      </div>
      <div class="navigation">
        <ul :style="{transform: 'translateX('+navigationLeft+'px)'}" ref="navigation">
          <li
            v-for="(itme,index) of navConent"
            :class="{'current':routerUrl.indexOf(itme.path) != -1}"
          >
            <span @click="navclik(index,itme.href)">{{itme.name}}</span>
            <i
              class="iconfont icon-icon-cross-empty"
              @click="navclose(index)"
              v-if="itme.href != newdata[0].href"
            ></i>
          </li>
        </ul>
      </div>
      <div class="operation close" v-popover:navContentClose>
        <span>关闭操作</span>
        <i class="iconfont icon-xia"></i>
      </div>
      <div class="operation rightShift" @click="rightShift">
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <div
      :class="['right_conent',{'lite':pattern}]"
      :style="{height:(conentHeight-42)+'px'}"
      v-loading.body="pageLoading || $store.state.viewLoading"
      element-loading-text="拼命加载中"
    >
      <router-view class="router-view"></router-view>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { async } from "@/config/fetch";

export default {
  components: {},
  computed: {
    ...mapState([
      "pageLoading",
      "routerUrl",
      "userInfo",
      "newdata",
      "badge",
      "badge2"
    ])
  },
  created() {
    //默认加载页面的时候新建首页
    this.navConent.push({
      name: this.newdata[0].name,
      path: this.newdata[0].href,
      href: this.newdata[0].href
    });
  },
  data() {
    return {
      conentHeight: window.innerHeight - 60, //计算页面view的高度
      pattern: false, //页面自适应
      leftNavState: 0, //左边以及导航
      navigationLeft: 0, //顶部导航容器的滑动距离
      navConent: [], //顶部导航容器
      userPopover: false, //左边超级管理弹窗
      closePopover: false //右边导航关闭
      // badge: sessionStorage.getItem("badge")
    };
  },
  watch: {
    //监听路由切换然后储存最新的URL和对应名称
    routerUrl: function(val, oldval) {
      for (var itme of this.navConent) {
        if (itme.href.indexOf(val) != -1) {
          var data = JSON.stringify({
            name: itme.name,
            href: itme.href,
            record: itme.record
          });
          sessionStorage.setItem("urlssion", data);
        }
      }
    }
  },
  methods: {
    //一级菜单
    navclick(index) {
      for (var itme of this.newdata) {
        itme.height = 0;
      }
      if (this.leftNavState == index) {
        this.leftNavState = null;
        this.newdata[index].height = 0;
      } else {
        this.leftNavState = index;
        if (this.newdata[index].list) {
          this.newdata[index].height = this.newdata[index].list.length * 38;
        }
      }
      if (window.innerWidth < 992 && this.newdata[index].href) {
        this.pattern = false;
      }
      if (this.newdata[index].href) {
        this.leftItme(this.newdata[index].name, this.newdata[index].href);
      }
    },
    //导航容器左箭头
    leftShift() {
      var nav_conent = this.$refs.nav_conent.offsetWidth;
      var navigation = this.$refs.navigation.offsetWidth;
      if (navigation < nav_conent - 163) {
        this.navigationLeft = 0;
      } else if (this.navigationLeft + (nav_conent - 163) * 0.4 > 0) {
        this.navigationLeft = 0;
      } else {
        this.navigationLeft = this.navigationLeft + (nav_conent - 163) * 0.4;
      }
    },
    //导航容器右箭头
    rightShift() {
      var nav_conent = this.$refs.nav_conent.offsetWidth;
      var navigation = this.$refs.navigation.offsetWidth;
      if (navigation < nav_conent - 163) {
        this.navigationLeft = 0;
      } else if (
        navigation - Math.abs(this.navigationLeft - (nav_conent - 163) * 0.4) <
        nav_conent - 163
      ) {
        this.navigationLeft = -(navigation - nav_conent + 163);
      } else {
        this.navigationLeft = this.navigationLeft - (nav_conent - 163) * 0.4;
      }
    },
    //导航容器点击
    navclik(index, href) {
      var nav_conent = this.$refs.nav_conent.offsetWidth;
      var navigation = this.$refs.navigation;
      var navigationWidth = navigation.offsetWidth;
      var navigationlist = navigation.getElementsByTagName("li");
      var currentWidth = navigationlist[index].offsetWidth;
      var width = 0;
      for (var i = 0; i < index; i++) {
        width += navigationlist[i].offsetWidth;
      }
      this.$router.push(href);
      if (navigationWidth < nav_conent - 163) {
        this.navigationLeft = 0;
      } else if (width - Math.abs(this.navigationLeft) < currentWidth) {
        this.leftShift();
      } else if (
        nav_conent - 163 - width - this.navigationLeft <
        currentWidth
      ) {
        this.rightShift();
      }
    },
    //导航点击
    leftItme(name, href, record) {
      var currentUrl, currentPath, newpath;
      if (href instanceof Object) {
        currentUrl =
          href.path +
          "?" +
          JSON.stringify(href.query)
            .replace(/[{]|[}]|["]|["]$/g, "")
            .replace(/[:]/g, "=")
            .replace(/[,]/g, "&");
        newpath = href.path.substring(1);
        if (newpath.indexOf("/") == -1) {
          currentPath = href.path;
        } else {
          currentPath = "/" + newpath.substring(0, newpath.indexOf("/"));
        }
      } else {
        currentUrl = href;
        newpath = href.substring(1);
        if (newpath.indexOf("/") == -1) {
          currentPath = href;
        } else {
          currentPath = "/" + newpath.substring(0, newpath.indexOf("/"));
        }
      }
      var _this = this;
      var state = false;
      var record = record ? record : false;
      for (var i in this.navConent) {
        if (
          currentPath == this.navConent[i].path ||
          currentPath == this.newdata[0].path
        ) {
          state = true;
        }
      }
      if (state) {
        this.$router.push(href);
      } else {
        this.navConent.push({
          name: name,
          path: currentPath,
          href: currentUrl,
          record: record
        });
        setTimeout(function() {
          _this.rightShift();
          _this.$router.push(href);
        });
      }
      if (window.innerWidth < 992) {
        this.pattern = false;
      }
    },
    //顶部导航关闭
    navclose(index) {
      var len = this.navConent.length;
      if (this.navConent[index].href.indexOf(this.routerUrl) != -1) {
        if (parseInt(len) - 1 == index) {
          if (index == 0) {
            this.$router.push(this.newdata[0].href);
          } else {
            this.$router.push(this.navConent[parseInt(index) - 1].href);
          }
        } else {
          this.$router.push(this.navConent[index + 1].href);
        }
      }
      this.navConent.splice(index, 1);
    },
    //关闭全部选项卡
    closeWhole() {
      this.navConent.splice(1, this.navConent.length);
      this.$router.push(this.newdata[0].href);
      this.closePopover = false;
    },
    //关闭其他选项卡
    closeOther(current) {
      for (var i in this.navConent) {
        if (this.navConent[i].href.indexOf(this.routerUrl) != -1) {
          if (current == "current") {
            if (this.navConent[i].href != this.newdata[0].href) {
              this.navclose(parseInt(i));
            }
          } else if (i == 0) {
            this.navConent.splice(1, this.navConent.length);
          } else {
            this.navConent.splice(1, i - 1);
            this.navConent.splice(2, this.navConent.length - 1);
          }
        }
      }
      this.closePopover = false;
    },
    //关闭当前页并跳转到指定页面
    closeJump(name, url) {
      this.closeOther("current");
      this.leftItme(name, url);
    },
    //退出登录
    signOut() {
      this.$confirm("确定退出登录？", "提示", {
        confirmButtonText: "确定退出",
        cancelButtonText: "再等等",
        type: "warning"
      })
        .then(() => {
          sessionStorage.clear();
          this.$router.push("/");
          this.userPopover = false;
        })
        .catch(() => {
          this.userPopover = false;
        });
    },
    //计算页面的高度
    viewHeight() {
      this.conentHeight = window.innerHeight - 60;
    },
    //页面数据
    getItem() {
      const _this = this;
      var consult = [
        { name: "企业认证信息", href: "/enterpriseIdentityList" },
        { name: "跟卖信息列表（未上架）", href: "/withNoSellInfoList" },
        { name: "求购信息列表", href: "/inquiryInfoList" },
        { name: "售后信息列表", href: "/questionInfoList" },
        { name: "商品报错信息列表", href: "/errorInfoList" },
        { name: "投诉建议信息列表", href: "/suggestInfoList" }
      ];
    }
  },
  mounted() {
    var _this = this;
    //刷新页面后加载最新的储存的页面
    var urlssion = sessionStorage.getItem("urlssion");
    var newurlssion = JSON.parse(urlssion);
    if (urlssion && newurlssion.href != this.newdata[0].href) {
      if (newurlssion.record) {
        this.leftItme(this.newdata[0].name, this.newdata[0].href);
      } else {
        this.leftItme(newurlssion.name, newurlssion.href);
      }
    }
    //第一次默认打开用户列表页
    if (this.newdata[0].href == this.routerUrl) {
      if (this.newdata[0].list) {
        this.newdata[0].height = this.newdata[0].list.length * 38;
      }
    }
    //获取首页数据
    this.getItem();
    //监听浏览器窗口大小改变时
    window.onresize = function() {
      _this.viewHeight();
    };

    // async(
    //   "/applyReflectController/queryApplyReflect.do",
    //   {
    //     rows: 10,
    //     page: 1,
    //     userName: "",
    //     queryEstablishTime: ""
    //   },
    //   "POST"
    // )
    //   .then(data => {
    //     console.log(data);
    //     // sessionStorage.setItem("badge", data.number);
    //     this.$store.state.badge = data.number;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     _this.$notify.error({
    //       title: "错误",
    //       message: "加载失败！"
    //     });
    //   });
    // async(
    //   "/opinionInfoController/queryOpinionInfo.do",
    //   {
    //     rows: 10,
    //     page: 1,
    //     userName: "",
    //     queryEstablishTime: ""
    //   },
    //   "POST"
    // )
    //   .then(data => {
    //     console.log(data);
    //     this.$store.state.badge2 = data.number;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     _this.$notify.error({
    //       title: "错误",
    //       message: "加载失败！"
    //     });
    //   });
  }
};
</script>
<style lang="scss">
@import "src/style/mixin";
@import "src/style/home";
.businessName {
  color: #fff;
}
.itemBadge {
  // margin-top: 20px;
  // margin-right: 40px;
}
.el-badge__content.is-fixed {
  transform: translateY(-10%) translateX(130%);
}
</style>
