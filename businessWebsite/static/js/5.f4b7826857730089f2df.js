webpackJsonp([5],{"9MDW":function(e,t,o){"use strict";var l=o("KOga");t.a={data:function(){return{pickerOptions0:{disabledDate:function(e){return e.getTime()<Date.now()}},value11:"",id:"",commodityId:"",commodityTypeId:"",collageNumber:"",collagePrice:"",commodityNumber:"",endTime:"",headMoney:"",isCollage:"",Type:"",pindanType:[{value:1,label:"是"},{value:2,label:"否"}],pindanTypeVal:"",info:""}},methods:{timestampToTime:function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()},cancel:function(){},xiugai:function(){var e=this,t=new Date(""+this.endTime),a=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();this.endTime=a,this.info,o.i(l.a)("/collageController/updateCollageSet.do",{id:this.$route.params.id,commodityId:this.$route.params.gid,commodityTypeId:this.$route.params.tid,collageNumber:this.collageNumber,collagePrice:this.collagePrice,commodityNumber:this.commodityNumber,endTime:this.endTime,headMoney:this.headMoney,isCollage:this.isCollage,type:"2"},"POST").then(function(t){200==t.code?e.$parent.closeJump("拼单设置","/pindanSet/"+e.$route.params.gid):e.$notify.error({title:"错误",message:"加载失败！"+t.msg})})},pageData:function(){var e=this;o.i(l.a)("/collageController/queryCollageSetDetails.do",{commodityTypeId:this.$route.params.tid},"POST").then(function(t){200==t.code?(e.info=t.info,e.isCollage=t.info.isCollage,e.collageNumber=t.info.collageNumber,e.headMoney=t.info.headMoney,e.collagePrice=t.info.collagePrice,e.commodityNumber=t.info.commodityNumber,e.endTime=e.formatTime(t.info.endTime,"yyyy-MM-dd")):e.$notify.error({title:"错误",message:"加载失败！"})})}},mounted:function(){this.pageData()}}},ICWn:function(e,t,o){"use strict";var l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("z-modular",[o("el-form",{ref:"companyInfo",attrs:{"label-width":"150px"}},[o("el-form-item",{attrs:{label:"是否开启拼单"}},[o("el-select",{attrs:{clearable:"",placeholder:"是否开启拼单"},model:{value:e.isCollage,callback:function(t){e.isCollage=t},expression:"isCollage"}},e._l(e.pindanType,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v("（开启拼单后不能修改）\n                ")],1),e._v(" "),o("el-form-item",{attrs:{label:"拼单单价（元）"}},[o("el-input",{model:{value:e.collagePrice,callback:function(t){e.collagePrice=t},expression:"collagePrice"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"拼成人数"}},[o("el-input",{model:{value:e.collageNumber,callback:function(t){e.collageNumber=t},expression:"collageNumber"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"拼成奖励（元）"}},[o("el-input",{model:{value:e.headMoney,callback:function(t){e.headMoney=t},expression:"headMoney"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"供拼数量"}},[o("el-input",{model:{value:e.commodityNumber,callback:function(t){e.commodityNumber=t},expression:"commodityNumber"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"结束时间"}},[o("el-date-picker",{attrs:{"picker-options":e.pickerOptions0,type:"date",placeholder:"选择日期",format:"yyyy - MM - dd","value-format":"yyyy-MM-dd"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}})],1),e._v(" "),o("el-form-item",{scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(o){e.xiugai(t.$index,t.row)}}},[e._v("保存")]),e._v(" "),o("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.cancel}},[e._v("取消")])]}}])})],1)],1)],1)},a=[],i={render:l,staticRenderFns:a};t.a=i},K7Ke:function(e,t,o){var l=o("gzU7");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);o("FIqI")("34d11c99",l,!0,{})},Uo0I:function(e,t,o){"use strict";function l(e){o("K7Ke")}Object.defineProperty(t,"__esModule",{value:!0});var a=o("9MDW"),i=o("ICWn"),n=o("C7Lr"),r=l,c=n(a.a,i.a,!1,r,null,null);t.default=c.exports},gzU7:function(e,t,o){t=e.exports=o("UTlt")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"pindanEdit.vue",sourceRoot:""}])}});
//# sourceMappingURL=5.f4b7826857730089f2df.js.map