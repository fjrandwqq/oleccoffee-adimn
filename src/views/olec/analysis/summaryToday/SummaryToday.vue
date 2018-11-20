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
       <el-date-picker v-model="daterange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate" :disabledDate="disabledDate">
        </el-date-picker>
        <el-button :type="selectedDate==='today'?'primary':''" @click="selectDate('today')">今日</el-button>
        <el-button :type="selectedDate==='yestoday'?'primary':''" @click="selectDate('yestoday')">昨日</el-button>
        <el-button :type="selectedDate==='week'?'primary':''" @click="selectDate('week')">本周</el-button>
        <el-button :type="selectedDate==='month'?'primary':''" @click="selectDate('month')">本月</el-button>
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
    <div class="line-chart-wrapper">
      <div class="bl-header">
        <h2>发展趋势</h2>
        <tool-box :btnList="tabsList" v-model="activeTab" @on-change="changeTab"></tool-box>
      </div>
      <div class="line-chart"></div>
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
    <!-- 一元商品统 -->
    <div class="bl-header">
      <h2>一元商品销量</h2>
    </div>
    <div class="goods-table">
      <el-table :data="specialGoodsSales" style="width: 100%" @sort-change="specialGoodsSalesSort">
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
  import { total, goodsCatSales, goodsSales, totalByDate } from '@/api/summaryToday'
  import { getShopsByRole } from '@/api/order'
  import { echartColors } from '@/config/global'
  import ToolBox from '@/components/toolBox/ToolBox'
  export default {
    components: {
      ToolBox
    },
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
        specialGoodsSearchParams: {
          sort: 'sales',
          desc: 'desc'
        },
        summaryData: {
          amount: 0,
          oneYuanSales: 0,
          sales: 0,
          average: 0
        },
        shopList: [],

        // 折线图的参数
        tabsList: [{
          value: 'amount',
          label: '营业总额'
        }, {
          value: 'oneYuanSales',
          label: '一元数量'
        }, {
          value: 'sales',
          label: '出单票数'
        }, {
          value: 'average',
          label: '平均消费'
        }],
        daterange: [],
        disabledDate: (date) => {
          console.log(date)
          return new Date(date).getTime() >= Date.now()
        },
        activeTab: 'amount',

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
        specialGoodsSales: [],
        chartsObj: {},

        selectedDate: 'today'
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
      this.chartsObj.lineChart = this.$echarts.init(
        document.querySelector('.line-chart')
      )
      this.setLineOption()
      window.onresize = () => {
        this.handleChartResize()
      }
      this.getTotalData()
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
        this.getSpecialGoodsSales()

        this.getTotalData()
      },
      getTotal() {
        const params = {
          shopId: this.shopId,
          orderStartDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[0])),
          orderEndDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[1]))
        }
        total(params).then(res => {
          this.summaryData = res
        })
      },
      getGoodsCatSales() {
        const params = {
          shopId: this.shopId,
          sort: this.goodsCatSearchParams.sort,
          desc: this.goodsCatSearchParams.desc,
          orderStartDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[0])),
          orderEndDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[1]))
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
          desc: this.goodsSearchParams.desc,
          orderStartDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[0])),
          orderEndDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[1]))
        }
        goodsSales(params).then(res => {
          this.goodsSales = res || []
        })
      },
      getSpecialGoodsSales() {
        const params = {
          shopId: this.shopId,
          sort: this.specialGoodsSearchParams.sort,
          desc: this.specialGoodsSearchParams.desc,
          isYiYuanSales: true,
          orderStartDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[0])),
          orderEndDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[1]))
        }
        goodsSales(params).then(res => {
          this.specialGoodsSales = res || []
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
      },
      specialGoodsSalesSort(params) {
        this.specialGoodsSearchParams = {
          sort: params.prop || 'sales',
          desc: params.order === 'ascending' ? 'asc' : 'desc'
        }
        this.getSpecialGoodsSales()
      },
      setLineOption() {
        this.lineOption = {
          color: echartColors,
          title: {
            text: '统计趋势图',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name: '最高气温',
              type: 'line',
              data: [11, 11, 15, 13, 12, 13, 10],
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            }]
        }
      },
      /**
       * 获取营业数据总数，对应第一个折线统计图
       */
      getTotalData() {
        const params = {
          id: this.shopId,
          orderStartDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[0])),
          orderEndDateTime: this.daterange.length === 0 ? '' : this.getNowFormatDate(new Date(this.daterange[1]))
        }
        totalByDate(params).then(res => {
          this.totalData = res
          this.changeTab('amount')
        })
      },
      changeTab(value) {
        let title = ''
        switch (value) {
          case 'amount':
            title = '营业总额'
            break
          case 'oneYuanSales':
            title = '一元数量'
            break
          case 'sales':
            title = '出单票数'
            break
          case 'average':
            title = '平均消费'
            break
        }
        this.lineOption.title.text = title
        this.lineOption.lengend = {
          data: [title]
        }
        this.lineOption.xAxis.data = this.totalData[value].map(e => e.date)
        this.lineOption.series = [{
          name: title,
          type: 'line',
          data: this.totalData[value].map(e => e[value]),
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        }]
        this.chartsObj.lineChart.setOption(this.lineOption)
      },
      // 获取当前时间，格式YYYY-MM-DD
      getNowFormatDate(date) {
        const seperator1 = '-'
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        const currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate
      },
      changeDate() {
        this.getTotal()
        this.getGoodsCatSales()
        this.getGoodsSales()
        this.getSpecialGoodsSales()
  
        this.getTotalData()
        this.changeTab(this.activeTab)
      },
      selectDate(role) {
        this.selectedDate = role
        switch (role) {
          case 'today':break
          case 'yestoday':break
          case 'week':break
          case 'month':break
        }
      }
    }
  }
</script>

<style lang="scss" scoped src="./SummaryToday.scss">
</style>
