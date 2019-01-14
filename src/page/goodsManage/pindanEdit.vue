<template>
    <div>
       <z-modular>
            <el-form ref="companyInfo" label-width="150px">
                <el-form-item label="是否开启拼单">

               <el-select  clearable v-model="isCollage" placeholder="是否开启拼单">
                 
					<el-option
						v-for="item in pindanType"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>（开启拼单后不能修改）
                </el-form-item>
                <el-form-item label="拼单单价（元）">
                    <el-input v-model="collagePrice" ></el-input>
                </el-form-item>  
                  <el-form-item label="拼成人数">
                    <el-input v-model="collageNumber" ></el-input>
                </el-form-item>  
                  <el-form-item label="拼成奖励（元）">
                    <el-input  v-model="headMoney"></el-input>
                </el-form-item>  
                  <el-form-item label="供拼数量">
                    <el-input v-model="commodityNumber" ></el-input>
                </el-form-item>  
                 <!-- {{endTime}} -->
                      <el-form-item label="结束时间">
                  <el-date-picker  :picker-options="pickerOptions0" v-model="endTime" type="date" placeholder="选择日期" format="yyyy - MM - dd" value-format="yyyy-MM-dd">
    </el-date-picker>
                </el-form-item> 

                 
                <!-- 结束时间 -->
                <el-form-item>  
		      <template slot-scope="scope">
		        <el-button type="primary" size="small" @click="xiugai(scope.$index,scope.row)">保存</el-button>
		        <el-button type="danger"  @click="cancel" size="small">取消</el-button>
            
          </template>
                </el-form-item>  
            </el-form>
       </z-modular>
    </div>
</template>
<script>
import { async } from "@/config/fetch";
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      value11: "",
      id: "", //	拼团设置Id
      commodityId: "", //	商品Id
      commodityTypeId: "", //	商品种类Id
      collageNumber: "", //拼团数量
      collagePrice: "", //	拼团单价
      commodityNumber: "", //	商品数量
      endTime: "", //拼团结束时间
      headMoney: "", //	团长佣金
      isCollage: "", //是否拼团 1是 2否
      Type: "", //无数据 传 1// 有数据 传2

      //是否实体店数组
      pindanType: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 2,
          label: "否"
        }
      ],

      pindanTypeVal: "", //是否实体店值
      info: ""
    };
  },
  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    cancel() {},
    //取消发布
    xiugai() {
      var date = new Date("" + this.endTime);
      var date_value =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      // +
      // " " +
      // date.getHours() +
      // ":" +
      // date.getMinutes() +
      // ":" +
      // date.getSeconds();
      // yyyy-MM-dd hh:mm:ss
      // alert(date_value);
      this.endTime = date_value;
      // alert(this.info);
      if (this.info) {
        //编辑
        async(
          "/collageController/updateCollageSet.do",
          {
            // Id	拼团设置Id
            id: this.$route.params.id,

            commodityId: this.$route.params.gid, //	商品Id
            commodityTypeId: this.$route.params.tid, //	商品种类Id
            collageNumber: this.collageNumber, //	拼团数量
            collagePrice: this.collagePrice, //	拼团单价
            commodityNumber: this.commodityNumber, //商品数量
            endTime: this.endTime, //拼团结束时间
            headMoney: this.headMoney, //	团长佣金
            isCollage: this.isCollage, //	是否拼团 1是 2否
            type: "2" //	无数据 传 1
            // 有数据 传2
          },
          "POST"
        ).then(data => {
          if (data.code == 200) {
            this.$parent.closeJump(
              "拼单设置",
              "/pindanSet/" + this.$route.params.gid
            );
          } else {
            this.$notify.error({
              title: "错误",
              message: "加载失败！" + data.msg
            });
          }
        });
      } else {
        //  新增
        async(
          "/collageController/updateCollageSet.do",
          {
            // Id	拼团设置Id
            id: this.$route.params.id,

            commodityId: this.$route.params.gid, //	商品Id
            commodityTypeId: this.$route.params.tid, //	商品种类Id
            collageNumber: this.collageNumber, //	拼团数量
            collagePrice: this.collagePrice, //	拼团单价
            commodityNumber: this.commodityNumber, //商品数量
            endTime: this.endTime, //拼团结束时间
            headMoney: this.headMoney, //	团长佣金
            isCollage: this.isCollage, //	是否拼团 1是 2否
            type: "2" //	无数据 传 1
            // 有数据 传2
          },
          "POST"
        ).then(data => {
          if (data.code == 200) {
            this.$parent.closeJump(
              "拼单设置",
              "/pindanSet/" + this.$route.params.gid
            );
          } else {
            this.$notify.error({
              title: "错误",
              message: "加载失败！" + data.msg
            });
          }
        });
      }
    },
    pageData() {
      async(
        "/collageController/queryCollageSetDetails.do",
        {
          // Id	拼团设置Id
          commodityTypeId: this.$route.params.tid //	商品种类Id
        },
        "POST"
      ).then(data => {
        if (data.code == 200) {
          this.info = data.info;

          this.isCollage = data.info.isCollage;
          this.collageNumber = data.info.collageNumber;
          this.headMoney = data.info.headMoney;
          this.collagePrice = data.info.collagePrice;
          this.commodityNumber = data.info.commodityNumber;
          this.endTime = this.formatTime(data.info.endTime, "yyyy-MM-dd");
        } else {
          this.$notify.error({
            title: "错误",
            message: "加载失败！"
          });
        }
      });
    }
  },
  mounted() {
    this.pageData();
  }
};
</script>
<style lang="scss">
</style>
