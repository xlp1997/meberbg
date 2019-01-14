<template>
    <div>	<!--搜索栏-->
  	<z-modular ModClass="homeMod">
		<!--添加-->
  		<div style="    float: left;
    display: inline;margin:25px 0 0 40px;color: #999;">
        <span>种类名称:</span>
   		</div>
        <!--输入框-->
  		<div class="search input">
  			<el-input style="margin:20px 0 0 20px;" type="text" v-model="commodityTypeName" placeholder="请输入名称"></el-input>
  		</div>

          <div style="    float: left;
    display: inline;margin:25px 0 0 40px;color: #999;">是否开启拼单:</div>
      		<div class="search input">

            <el-select style="margin:20px 0 0 20px;" clearable v-model="isCollage" placeholder="是否开启拼单">
					<el-option
						v-for="item in pindanType"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
      		</div>
			<!--搜索-->
		<div class="search">
  			<el-button style="margin:20px 0 0 20px;" type="primary" @click="handleCurrentChange(1)" >搜索</el-button>
         <!-- -->
  		</div>

  	</z-modular>
    	<!--表格栏-->
   <z-modular>
   





 









  		<el-table :data="tableData" border style="width: 100%" max-height="700">
		    <el-table-column prop="commodityTypeName" label="种类名称" min-width="130" align="center"></el-table-column>
		    <el-table-column prop="commodityTypePrice" label="价格（元）" min-width="130" align="center"></el-table-column>
                
                		    <el-table-column prop="commodityTypeStock" label="库存" min-width="130" align="center"></el-table-column>
                		  
        		    <el-table-column    label=" 是否拼单" min-width="130" align="center">
                     <template slot-scope="scope"> 
              <span v-if="scope.row.isCollage==1">是</span>
                <span v-else>否</span> 
		           </template>
                </el-table-column>

         <el-table-column prop="collagePrice" label="拼单价格（元）" min-width="130" align="center"></el-table-column>
                		    <el-table-column prop="commodityNumber" label="供拼数量" min-width="130" align="center"></el-table-column>


                		    <el-table-column prop="headMoney" label="拼成奖励（金币）" min-width="130" align="center"></el-table-column>

            <el-table-column  label="开始时间" min-width="160"   align="center">
              <template slot-scope="scope">
                 {{scope.row.establishTime | format('yyyy-MM-dd hh:mm')}}
		          </template>
            </el-table-column>
            
            <el-table-column  label="结束时间" min-width="160"   align="center">
              <template slot-scope="scope">
                 {{scope.row.endTime | format('yyyy-MM-dd hh:mm')}}
		          </template>
            </el-table-column>
            		    <!-- <el-table-column  align="center" width="80" label="状态">
             <template slot-scope="scope"> 
              <span v-if="scope.row.goldCoinTermState==1">开启</span>
              <span v-if="scope.row.goldCoinTermState==2">关闭</span>
		           </template>
                     </el-table-column> -->

		    <el-table-column  label="操作" min-width="200" align="center">
		      <template slot-scope="scope">
		        <el-button type="primary" @click="handleEdit(scope.$index,scope.row)" size="small" >编辑</el-button>
                
          <el-button type="primary" @click="handlePintunManger(scope.$index,scope.row)" size="small">拼团管理</el-button>

		      </template>
		    </el-table-column>
  		</el-table>

  		<!--分页-->
  	  <!-- <div class="paginationdiv">
  			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageNo"
		      :page-sizes="[10, 20, 30, 50]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="size">
		    </el-pagination>
  		</div>  -->
  	 </z-modular> 
   
    </div>
</template>
<script>
import { async } from "@/config/fetch";
export default {
  data() {
    return {
      commodityTypeName: "",

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
          label: "是"
        },
        {
          value: 2,
          label: "否"
        }
      ],

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
      console.log(index + "----" + row.goldCoinTermId);
      this.$parent.leftItme(
        "编辑拼单信息",
        "/pindanEdit/" +
          row.id +
          "/" +
          row.commodityId +
          "/" +
          row.commodityTypeId
      );
    },
    handlePintunManger(index, row) {
      console.log(index + "----" + row.goldCoinTermId);
      this.$parent.leftItme("拼团管理", "/pindanManage");
    },
    pageData(pageNo, pageSize) {
      //         commodityId	商品Id
      // commodityTypeName	总类名称
      // isCollage	拼单状态
      async(
        "/commodityController/queryCommodityTypeCollageSet.do",
        {
          //   rows: pageSize,
          // page: pageNo,
          // goldCoinTermName: this.searchName
          commodityId: this.$route.params.id,
          isCollage: this.isCollage,
          commodityTypeName: this.commodityTypeName
        },
        "POST"
      ).then(data => {
        if (data.code == 200) {
          this.tableData = data.rows;
          this.size = data.total;
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
    this.pageData(this.pageNo, this.pageSize);
    console.log("c");
  }
};
</script>
<style scoped>
.search {
  margin-top: 0px;
}
</style>


