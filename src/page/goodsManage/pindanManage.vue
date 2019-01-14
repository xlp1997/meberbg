<template>
    <div>	<!--搜索栏-->
  	<z-modular ModClass="homeMod">
		<!--添加-->
   <div style="float:left;margin-top:40px;    color: #1f2d3d;">发起人</div>
        <!--输入框-->
  		<div class="search input">
  			<el-input style="margin:20px;" type="text" v-model="userName" placeholder="请输入名称"></el-input>
  		</div>
 <div style="float:left;margin-top:40px;margin-left:20px;    color: #1f2d3d;">拼单状态</div>
        <!--输入框-->
  		<div class="search input">
              <el-select style="margin:20px;"   clearable v-model="collageState" placeholder="拼单状态">
					<el-option
						v-for="item in pindanType"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
  		</div>
         <div style="float:left;margin-top:40px;margin-left:20px;    color: #1f2d3d;">发起时间</div>
        <!--输入框-->
  		<div class="search input">
        		<el-date-picker
            style="margin:20px;"
					v-model="conDate"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					 placeholder="请选择发布时间"
					>
				</el-date-picker>
   		</div> 

         
      	 
			<!--搜索-->
		<div class="search">
  			<el-button style="margin:20px;" type="primary" @click="handleCurrentChange(1)" >搜索</el-button>
         <!-- -->
  		</div>

  	</z-modular>
    	<!--表格栏-->
   <z-modular>
  		<el-table :data="tableData" border style="width: 100%" max-height="700">
  <el-table-column  label="发起时间" min-width="160"   align="center">
              <template slot-scope="scope">
                 {{scope.row.establish_time | format('yyyy-MM-dd hh:mm')}}
		          </template>
            </el-table-column>
<!-- 1成功 2失败  3拼团中 -->
 <el-table-column    label="拼单状态" min-width="130" align="center">
                     <template slot-scope="scope"> 
              <span v-if="scope.row.collage_state==1">成功</span>
                            <span v-if="scope.row.collage_state==2">已结束</span>
              <span v-if="scope.row.collage_state==3">拼团中</span>

 		           </template>
                </el-table-column>
       

		    <el-table-column prop="user_name" label="发起人" min-width="130" align="center"></el-table-column>
		    <el-table-column prop="number" label="参与人数" min-width="130" align="center"></el-table-column>
        		   
          
              <el-table-column  label="剩余时间" min-width="160"   align="center">
              <template slot-scope="scope">
                 <!-- <span>{{scope.row.end_time | format('yyyy-MM-dd hh:mm')}}</span> -->
                              <timeDown @time-end="message = '00时00分'" :endTime='scope.row.end_time'></timeDown>

		          </template>
            </el-table-column>

		    <el-table-column  label="操作" min-width="200" align="center">
		      <template slot-scope="scope">
		        <el-button type="primary" @click="handleEdit(scope.$index,scope.row)" size="small" >详情</el-button>
                
          <el-button type="primary"  v-if="scope.row.collage_state==3" @click="handlePintunManger(scope.$index,scope.row)" size="small">结束拼</el-button>
                  <el-button  v-if="scope.row.collage_state!==3"  type="info" size="small">已结束</el-button>

		      </template>
		    </el-table-column>
  		</el-table>

  		<!--分页-->
  	  <div class="paginationdiv">
  			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageNo"
		      :page-sizes="[10, 20, 30, 50]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="size">
		    </el-pagination>
  		</div> 
  	 </z-modular> 
   <el-dialog
  title="拼单详情"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <!-- <span>需要注意的是内容是默认不居中的</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span> -->
<z-modular>
  		<el-table :data="tableDataDetails" border style="width: 100%" max-height="700">
  		    <el-table-column prop="user_name" label="发起人" min-width="130" align="center"></el-table-column>

<!-- 1成功 2失败  3拼团中 -->
 <el-table-column    label="拼单状态" min-width="130" align="center">
                     <template slot-scope="scope"> 
              <span v-if="scope.row.commodity_collage_state==1">拼单成功</span>
                  <span v-if="scope.row.commodity_collage_state==2">拼单失败</span>

 		           </template>
                </el-table-column>
       

        		   
          
              <el-table-column  label="时间" min-width="160"   align="center">
              <template slot-scope="scope">
                 <span>{{scope.row.establish_time | format('yyyy-MM-dd hh:mm')}}</span>

		          </template>
            </el-table-column>
            

		  
  		</el-table>

  	 
  	 </z-modular> 


</el-dialog>

    </div>
</template>
<script>
import timeDown from "../../components/common/timeDown";
import { async } from "@/config/fetch";
export default {
  components: {
    timeDown
  },
  data() {
    return {
      message: "",
      centerDialogVisible: false,
      tableDataDetails: [],
      commodityTypeName: "",
      userName: "", //	用户名称
      collageState: "", //	拼单状态
      queryEstablishTime: "", //	发起时间
      //当前页数
      pageNo: 1,
      //页面条数
      pageSize: 10,
      tableData: [],
      size: 1,
      //是否实体店数组
      pindanType: [
        {
          value: 1,
          label: "成功"
        },
        {
          value: 2,
          label: "已结束"
        },
        {
          value: 3,
          label: "拼团中"
        }
      ],
      conDate: [],
      isCollage: "" //是否实体店值
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageData(this.pageNo, val);
    },
    handleCurrentChange(val) {
      console.log(this.selectedOptions);
      this.pageNo = val;
      this.pageData(val, this.pageSize);
    },
    handleEdit(index, row) {
      // console.log(index + "----" + row.goldCoinTermId);
      // this.$parent.leftItme("编辑拼单信息", "/pindanEdit");
      this.centerDialogVisible = true;
      async(
        "/collageController/queryCollageDetails.do",
        {
          commodityCollageId: row.id
        },
        "POST"
      ).then(data => {
        if (data.code == 200) {
          this.tableDataDetails = data.list;
          // alert("cc");
          // this.size = data.total;
        } else {
          this.$notify.error({
            title: "错误",
            message: "加载失败！"
          });
        }
      });
    },
    handlePintunManger(index, row) {
      this.$confirm("确定删除结束拼吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //结束拼
          // console.log(index + "----" + row.goldCoinTermId);
          // this.$parent.leftItme("拼团管理", "/pintunManager");
          async(
            "/collageController/endCollage.do",
            {
              commodityCollageId: row.id
            },
            "POST"
          ).then(data => {
            if (data.code == 200) {
            } else {
              this.$notify.error({
                title: "错误",
                message: "加载失败！"
              });
            }
          });
        })
        .catch(() => {});
    },
    pageData(pageNo, pageSize) {
      var queryEstablishTime = "";
      console.log(this.conDate);
      if (this.conDate.length > 0) {
        if (this.conDate[1] != null && this.conDate[0] != null) {
          queryEstablishTime = JSON.stringify({
            start: this.conDate[0].getTime(),
            end: this.conDate[1].getTime()
          });
        }
      }

      //         commodityId	商品Id
      // commodityTypeName	总类名称
      // isCollage	拼单状态
      async(
        "/collageController/queryCollage.do",
        {
          //           rows	行数
          // page	页数
          // userName	用户名称
          // collageState	拼单状态
          // queryEstablishTime	发起时间

          rows: pageSize,
          page: pageNo,
          userName: this.userName,
          collageState: this.collageState,
          queryEstablishTime: queryEstablishTime
        },
        "POST"
      ).then(data => {
        if (data.code == 200) {
          this.tableData = data.rows;
          this.size = data.total;
          console.log("1111111111111111111111111111111111111");
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].end_time = this.formatTime(
              this.tableData[i].end_time,
              "yyyy-MM-dd hh:mm:ss"
            );
          }
          console.log(this.tableData.length);
        } else {
          this.$notify.error({
            title: "错误",
            message: "加载失败！"
          });
        }
      });
    },
    xiangqing() {}
  },
  mounted() {
    this.xiangqing();
    this.pageData(this.pageNo, this.pageSize);
  }
};
</script>
<style>
</style>


