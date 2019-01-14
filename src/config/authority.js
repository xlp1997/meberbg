import store from '@/config/store'
var authorityList = [
  //左边导航的数据
  {
    name: "商品管理",
    leftIcon: "icon-shangpin",
    height: 0,
    href: "/goodsManage",
    id: 1
  },


  {
    name: "订单管理",
    leftIcon: "icon-74wodedingdan",
    height: 0,
    href: "/ordersManage",
    id: 2
  },



];
var authority = function (menuList) {
  var newAuthority = new Array();
  authorityList.forEach(item => {
    // menuList.forEach(element => {
    // console.log(item.name);
    // if (item.name == element.sysMenuName) {//加权限的
    newAuthority.push(item);
    // }
    // });
  });
  // console.log(newAuthority)

  return newAuthority;
}
export {
  authority
}
