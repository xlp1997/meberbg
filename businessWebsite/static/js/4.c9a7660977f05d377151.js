webpackJsonp([4],{"2adY":function(e,t,a){t=e.exports=a("UTlt")(!0),t.push([e.i,".search[data-v-30de6fae]{margin-top:0}","",{version:3,sources:["E:/xiaoliping/newPersonProject/1.6.1/merchantsBackstage/src/page/goodsManage/pindanSetting.vue"],names:[],mappings:"AACA,yBACE,YAAgB,CACjB",file:"pindanSetting.vue",sourcesContent:["\n.search[data-v-30de6fae] {\r\n  margin-top: 0px;\n}\r\n"],sourceRoot:""}])},AlId:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("z-modular",{attrs:{ModClass:"homeMod"}},[a("div",{staticStyle:{float:"left",display:"inline",margin:"25px 0 0 40px",color:"#999"}},[a("span",[e._v("种类名称:")])]),e._v(" "),a("div",{staticClass:"search input"},[a("el-input",{staticStyle:{margin:"20px 0 0 20px"},attrs:{type:"text",placeholder:"请输入名称"},model:{value:e.commodityTypeName,callback:function(t){e.commodityTypeName=t},expression:"commodityTypeName"}})],1),e._v(" "),a("div",{staticStyle:{float:"left",display:"inline",margin:"25px 0 0 40px",color:"#999"}},[e._v("是否开启拼单:")]),e._v(" "),a("div",{staticClass:"search input"},[a("el-select",{staticStyle:{margin:"20px 0 0 20px"},attrs:{clearable:"",placeholder:"是否开启拼单"},model:{value:e.isCollage,callback:function(t){e.isCollage=t},expression:"isCollage"}},e._l(e.pindanType,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("div",{staticClass:"search"},[a("el-button",{staticStyle:{margin:"20px 0 0 20px"},attrs:{type:"primary"},on:{click:function(t){e.handleCurrentChange(1)}}},[e._v("搜索")])],1)]),e._v(" "),a("z-modular",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"","max-height":"700"}},[a("el-table-column",{attrs:{prop:"commodityTypeName",label:"种类名称","min-width":"130",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"commodityTypePrice",label:"价格（元）","min-width":"130",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"commodityTypeStock",label:"库存","min-width":"130",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:" 是否拼单","min-width":"130",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isCollage?a("span",[e._v("是")]):a("span",[e._v("否")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"collagePrice",label:"拼单价格（元）","min-width":"130",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"commodityNumber",label:"供拼数量","min-width":"130",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"headMoney",label:"拼成奖励（金币）","min-width":"130",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"开始时间","min-width":"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                 "+e._s(e._f("format")(t.row.establishTime,"yyyy-MM-dd hh:mm"))+"\n\t\t          ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"结束时间","min-width":"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                 "+e._s(e._f("format")(t.row.endTime,"yyyy-MM-dd hh:mm"))+"\n\t\t          ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){e.handlePintunManger(t.$index,t.row)}}},[e._v("拼团管理")])]}}])})],1)],1)],1)},l=[],i={render:n,staticRenderFns:l};t.a=i},cCjO:function(e,t,a){var n=a("2adY");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("FIqI")("9c744d46",n,!0,{})},r1t1:function(e,t,a){"use strict";function n(e){a("cCjO")}Object.defineProperty(t,"__esModule",{value:!0});var l=a("vfNj"),i=a("AlId"),o=a("C7Lr"),r=n,s=o(l.a,i.a,!1,r,"data-v-30de6fae",null);t.default=s.exports},vfNj:function(e,t,a){"use strict";var n=a("KOga");t.a={data:function(){return{commodityTypeName:"",pageNo:1,pageSize:10,tableData:[],size:1,pindanType:[{value:1,label:"是"},{value:2,label:"否"}],isCollage:""}},methods:{handleSizeChange:function(e){this.pageSize=e,this.pageData(this.pageNo,e)},handleCurrentChange:function(e){console.log(this.selectedOptions),this.pageNo=e,this.pageData(e,this.pageSize)},handleEdit:function(e,t){console.log(e+"----"+t.goldCoinTermId),this.$parent.leftItme("编辑拼单信息","/pindanEdit/"+t.id+"/"+t.commodityId+"/"+t.commodityTypeId)},handlePintunManger:function(e,t){console.log(e+"----"+t.goldCoinTermId),this.$parent.leftItme("拼团管理","/pindanManage")},pageData:function(e,t){var l=this;a.i(n.a)("/commodityController/queryCommodityTypeCollageSet.do",{commodityId:this.$route.params.id,isCollage:this.isCollage,commodityTypeName:this.commodityTypeName},"POST").then(function(e){200==e.code?(l.tableData=e.rows,l.size=e.total):l.$notify.error({title:"错误",message:"加载失败！"})})}},mounted:function(){this.pageData(this.pageNo,this.pageSize),console.log("c")}}}});
//# sourceMappingURL=4.c9a7660977f05d377151.js.map