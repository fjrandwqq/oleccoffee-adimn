<!--
Description
@authors Your Name (you@example.org)
@date    2018-10-18 22:08:55
@version 1.0.0
-->
<template>
  <div id="summary-today">
       <div class="data-box">
            <div class="block">
                <p>{{summaryData.amount|filterEmpty}}</p>
                <p>营业总额（元）</p>
            </div>
            <div class="block">
                <p>{{summaryData.oneYuanSales|filterEmpty}}</p>
                <p>一元数量（单）</p>
            </div>
            <div class="block">
                <p>{{summaryData.sales|filterEmpty}}</p>
                <p>出单票数（单）</p>
            </div>
            <div class="block">
                <p>{{summaryData.average|filterEmpty}}</p>
                <p>平均消费（元） </p>
            </div>
        </div>
        <el-row class="goods-cat-part">
            <el-col :md="18" :xs="24">
                <el-table
                    :data="goodsCatSales"
                    style="width: 100%">
                    <el-table-column
                    prop="id"
                    label="id">
                    </el-table-column>
                    <el-table-column
                    prop="goodsCatName"
                    label="分类"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="sales"
                    label="销量"
                    sortable
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="salesProportion"
                    label="销量占比">
                    </el-table-column>
                    <el-table-column
                    prop="amount"
                    label="总额"
                     sortable
                     >
                     <template slot-scope="scope">
                         <div class="bar-bg">
                             <div class="bar-content" style="width:10%"></div>
                         </div>
                     </template>
                    </el-table-column>
                    <el-table-column
                    prop="amountProportion"
                    label="总额占比">
                    </el-table-column>
                </el-table>   
            </el-col>
            <el-col :md="6" :xs="24">
                <div class="pie-chart">饼图</div>
            </el-col>
        </el-row>
        <div class="goods-table">
            <el-table
                :data="goodsSales"
                style="width: 100%">
                <el-table-column
                prop="id"
                label="id">
                </el-table-column>
                <el-table-column
                prop="goodsName"
                label="商品名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="goodsCatName"
                label="分类"
                width="180">
                </el-table-column>
                <el-table-column
                prop="sales"
                label="销量"
                sortable
                >
                </el-table-column>
                 <el-table-column
                prop="salesProportion"
                label="销量占比">
                </el-table-column>
                <el-table-column
                prop="amount"
                label="总额"
                sortable
                >
                </el-table-column>
                 <el-table-column
                prop="amountProportion"
                label="总额占比">
                </el-table-column>
            </el-table>   
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      summaryData: {
        amount: 100,
        oneYuanSales: 50,
        sales: 100,
        average: 28
      },
      goodsCatSales: [{
        id: 1,
        goodsCatName: '经典热咖啡系列',
        sales: 100,
        salesProportion: 28.12,
        amount: 200,
        amountProportion: 3.92
      }],
      goodsSales: [
        {
          id: 1,
          goodsName: '招牌卡布基诺咖啡',
          goodsCatName: '经典热咖啡系列',
          sales: 100,
          salesProportion: 28.12,
          amount: 200,
          amountProportion: 3.92
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped src="./SummaryToday.scss">
</style>
