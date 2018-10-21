<!--
Description
@authors Your Name (you@example.org)
@date    2018-10-18 22:08:55
@version 1.0.0
-->
<template>
  <div id="summary-today">
    <div class="page-control">
      <el-select size="large" v-model="shopId" placeholder="请选择" @change="changeShop">
        <el-option v-for="(item,index) in shopList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </div>
    <!-- 全部统计 -->
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
    <!-- 商品分类统计 -->
    <div class="bl-header">
      <h2>分类销量统计</h2>
    </div>
    <el-row class="goods-cat-part" :gutter="20">
      <el-col :md="18" :xs="24">
        <el-table :data="goodsCatSales" style="width: 100%" @sort-change="goodsCatSort">
          <!-- <el-table-column prop="id" label="id">
          </el-table-column> -->
          <el-table-column prop="goodsCatName" label="分类" width="180">
          </el-table-column>
          <el-table-column prop="sales" label="销量" sortable="custom" width="180">
            <template slot-scope="scope">
              <div class="bar-bg" :style="{background:`linear-gradient(to right,#fb3 ${scope.row.salesProportion}%,#d3e5f0 0)`}">
                {{scope.row.sales}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="salesProportion" label="销量占比">
            <template slot-scope="scope">
              {{scope.row.salesProportion}}%
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="总额" sortable="custom">
            <template slot-scope="scope">
              <div class="bar-bg" :style="{background:`linear-gradient(to right,#fb3 ${scope.row.amountProportion}%,#d3e5f0 0)`}">
                {{scope.row.amount}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="amountProportion" label="总额占比">
            <template slot-scope="scope">
              {{scope.row.amountProportion}}%
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :md="6" :xs="24">
        <div class="pie-chart">
          <div class="goodsCat-analysis" style="height:400px"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 商品统计 -->
    <div class="bl-header">
      <h2>商品销量</h2>
    </div>
    <div class="goods-table">
      <el-table :data="goodsSales" style="width: 100%" @sort-change="goodsSalesSort">
        <!-- <el-table-column prop="id" label="id">
        </el-table-column> -->
        <el-table-column prop="goodsName" label="商品名" width="180">
        </el-table-column>
        <el-table-column prop="goodsCatName" label="分类" width="180">
        </el-table-column>
        <el-table-column prop="sales" label="销量" sortable="custom">
          <template slot-scope="scope">
            <div class="bar-bg" :style="{background:`linear-gradient(to right,#fb3 ${scope.row.salesProportion}%,#d3e5f0 0)`}">
              {{scope.row.sales}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="salesProportion" label="销量占比">
          <template slot-scope="scope">
            {{scope.row.salesProportion}}%
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="总额" sortable="custom">
          <template slot-scope="scope">
            <div class="bar-bg" :style="{background:`linear-gradient(to right,#fb3 ${scope.row.amountProportion}%,#d3e5f0 0)`}">
              {{scope.row.amount}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="amountProportion" label="总额占比">
          <template slot-scope="scope">
            {{scope.row.amountProportion}}%
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { total, goodsCatSales, goodsSales } from '@/api/summaryToday'
import { getShopsByRole } from '@/api/order'
import { echartColors } from '@/config/global'
export default {
  data() {
    return {
      shopId: null,
      goodsSearchParams: {
        sort: 'sales',
        desc: 'desc'
      },
      goodsCatSearchParams: {
        sort: 'sales',
        desc: 'desc'
      },
      shopList: [],
      summaryData: {
        amount: 0,
        oneYuanSales: 0,
        sales: 0,
        average: 0
      },
      goodsCatSales: [
        {
          id: 1,
          goodsCatName: '',
          sales: 0,
          salesProportion: 0,
          amount: 0,
          amountProportion: 0
        }
      ],
      goodsSales: [
        {
          id: 1,
          goodsName: '',
          goodsCatName: '',
          sales: 0,
          salesProportion: 0,
          amount: 0,
          amountProportion: 0
        }
      ],
      chartsObj: {}
    }
  },
  created() {
    this.setPieOption()
    this.getAllShop()
  },
  mounted() {
    this.chartsObj.goodsCatChart = this.$echarts.init(
      document.querySelector('.goodsCat-analysis')
    )
    window.onresize = () => {
      this.handleChartResize()
    }
  },
  methods: {
    handleChartResize() {
      this.$nextTick(() => {
        for (const i in this.chartsObj) {
          this.chartsObj[i].resize()
        }
      })
    },
    /**
     * 饼图参数
     */
    setPieOption() {
      this.goodsCatOption = {
        color: echartColors,
        title: {
          top: 20,
          textStyle: {
            fontSize: 20,
            lineHeight: 1,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: {
            color: '#000000'
          }
        },
        series: {
          type: 'pie',
          selectedMode: 'single',
          radius: ['100', '100%'],
          center: ['50%', '50%']
        }
      }
    },
    getAllShop() {
      getShopsByRole().then(data => {
        this.shopList = data || []
        if (this.shopList.length > 0) {
          this.shopId = this.shopList[0].id
          this.changeShop()
        }
      })
    },

    changeShop(shopId) {
      this.getTotal()
      this.getGoodsCatSales()
      this.getGoodsSales()
    },
    getTotal() {
      const params = {
        shopId: this.shopId
      }
      total(params).then(res => {
        this.summaryData = res
      })
    },
    getGoodsCatSales() {
      const params = {
        shopId: this.shopId,
        sort: this.goodsCatSearchParams.sort,
        desc: this.goodsCatSearchParams.desc
      }
      console.log(params)
      goodsCatSales(params).then(res => {
        this.goodsCatSales = res || []
        // 转成饼图需要的数据
        this.goodsCatSalesPie = this.goodsCatSales.map(e => {
          return {
            name: e.goodsCatName,
            value: e.sales
          }
        })
        this.goodsCatOption.title.text = '销量统计'
        this.goodsCatOption.series = [
          {
            type: 'pie',
            name: '销量统计',
            selectedMode: 'single',
            center: ['50%', '50%'],
            label: {
              show: false
            },
            data: this.goodsCatSalesPie
          }
        ]
        this.$nextTick(e => {
          this.chartsObj.goodsCatChart.setOption(this.goodsCatOption)
        })
      })
    },
    getGoodsSales() {
      const params = {
        shopId: this.shopId,
        sort: this.goodsSearchParams.sort,
        desc: this.goodsSearchParams.desc
      }
      goodsSales(params).then(res => {
        this.goodsSales = res || []
      })
    },
    goodsCatSort(params) {
      this.goodsCatSearchParams = {
        sort: params.prop || 'sales',
        desc: params.order === 'ascending' ? 'asc' : 'desc'
      }
      this.getGoodsCatSales()
    },
    goodsSalesSort(params) {
      this.goodsSearchParams = {
        sort: params.prop || 'sales',
        desc: params.order === 'ascending' ? 'asc' : 'desc'
      }
      this.getGoodsSales()
    }
  }
}
</script>

<style lang="scss" scoped src="./SummaryToday.scss">
</style>
