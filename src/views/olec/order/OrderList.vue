<!--
Description
@authors Your Name (you@example.org)
@date    2018-07-29 19:56:23
@version 1.0.0
-->
<template>
  <div id="order-list">
    <el-form inline :model="form" class="search-form">
      <el-form-item label="店铺编号">
        <!-- <el-input v-model="form.shopCode" placeholder="请输入店铺编号"></el-input> -->
        <el-select size="mini" v-model="form.shopCode" placeholder="请选择" clearable>
          <el-option v-for="item in shops" :key="item.name" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input size="mini" v-model="form.orderCode" placeholder="请输入订单编号"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input size="mini" v-model="form.userAddress" placeholder="请输入收货地址"></el-input>
      </el-form-item>
      <el-form-item label="收货电话">
        <el-input size="mini" v-model="form.userMobile" placeholder="请输入收货电话"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select size="mini" v-model="form.status" placeholder="请选择">
          <el-option v-for="item in statusList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送方式">
        <el-select size="mini" v-model="form.receiveType" placeholder="请选择">
          <el-option v-for="item in receiveTypeList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单时间">
        <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="date" type="" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
        <el-date-picker size="mini" v-model="selectDate" align="right" type="date" placeholder="选择日期"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="ol-table" ref="tableWrapper">
      <el-table :data="orderList" size="small" highlight-current-row border stripe style="width: 100%">
        <el-table-column align="center" prop="code" label="订单号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="userName" label="客户名称" width="100">
        </el-table-column>
        <el-table-column align="center" prop="userMobile" label="手机号码" width="120">
        </el-table-column>
        <el-table-column align="center" prop="content" label="购买项" width="100">
        </el-table-column>
        <el-table-column align="center" prop="realTotalMoney" label="总价" width="100">
        </el-table-column>
        <el-table-column align="center" prop="deliveryMoney" label="配送费用" width="100">
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="100">
        </el-table-column>
        <el-table-column align="center" prop="showTime" width="120" label="下单时间">
        </el-table-column>
        <el-table-column align="center" prop="showReceiveDateTime" width="120" label="自提或收货时间">
        </el-table-column>
        <el-table-column align="center" prop="receiveType" label="配送方式" width="100">
        </el-table-column>
        <el-table-column align="center" prop="userAddress" label="收货地址">
        </el-table-column>
        <el-table-column align="center" prop="status" label="支付状态" width="100">
        </el-table-column>
        <el-table-column align="center" label="店员操作状态" width="140" fixed='right'>
          <template slot-scope="scope">
            <!-- <span class="single-btn" @click="showDetail(scope.row)">查看</span>
                        <span class="single-btn" @click="editOrder(scope.$index, scope.row)">修改</span>
                        <span class="single-btn" @click="deleteOrder(scope.$index, scope.row)">删除</span>
                        <el-dropdown>
                            <span class="el-dropdown-link more-btn">
                                更多
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>修改</el-dropdown-item>
                                <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown> -->
            <el-button size="mini" v-show="scope.row.status === '已完成'" type="success" icon="el-icon-success">已完成
            </el-button>
            <el-button size="mini" v-show="scope.row.status !== '已完成'" type="danger"
                       @click="confirmFinishOrder(scope.$index, scope.row)">完成
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination v-show="total>0" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { getOrder, getShopsByRole, finishOrder } from '@/api/order'
  import { mapMutations, mapGetters } from 'vuex'
  import { Format } from '@/utils/utils'

  export default {
    data() {
      return {
        receiveTypeList: ['全部', '送货上门', '自提'],
        statusList: [
          '全部',
          '用户拒收',
          '用户取消',
          '未付款',
          '已付款',
          '待发货',
          '配送中',
          '确认收货',
          '已完成'
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        orderList: [],
        dateRange: [],
        form: {
          shopCode: '',
          receiveType: '',
          orderCode: '',
          userMobile: '',
          userAddress: '',
          orderStartDateTime: '',
          orderEndDateTime: '',
          status: '',
          start: 0,
          length: 10
        },
        shops: [],
        selectDate: new Date(),
        pickerOptions: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date())
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            },
            {
              text: '一周前',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['unfinishedOrders'])
    },
    watch: {},
    mounted() {
      this.getAllShop()
      this.search()
      this.$root.$on('showUnfinisnedOrderList', this.showUnfinisnedOrderList)
    },
    methods: {
      ...mapMutations(['setUnfinishedOrders']),
      search() {
        if (this.form.status === '全部') {
          this.form.status = ''
        }
        if (this.form.receiveType === '全部') {
          this.form.receiveType = ''
        }
        if (this.selectDate) {
          const date = Format(new Date(this.selectDate), 'yyyy-MM-dd')
          this.form.orderStartDateTime = `${date} 00:00:00`
          this.form.orderEndDateTime = `${date} 23:59:59`
        } else {
          this.form.orderStartDateTime = ''
          this.form.orderEndDateTime = ''
        }
        this.form.start = (this.currentPage - 1) * this.pageSize
        this.form.length = this.pageSize
        this.getOrderList()
      },
      getOrderList() {
        getOrder(this.form)
          .then(data => {
            const { datas = [], count = 0 } = data || {}
            datas.map(e => {
              e.content = ''
              for (let i = 0; i < e.ordersGoods.length; i++) {
                if (
                  e.ordersGoods[i].specJson !== null &&
                  e.ordersGoods[i].specJson !== ''
                ) {
                  const specListText = JSON.parse(e.ordersGoods[i].specJson)
                    .map(e => e.name)
                    .join(' ')
                  e.content += `${e.ordersGoods[i].goodsName ||
                  ''} ${specListText} ${e.ordersGoods[i].goodsNum}杯*${
                    e.ordersGoods[i].goodsRealPrice
                  }元`
                }
              }
              if (e.orderDateTime) {
                const date = new Date(e.orderDateTime)
                const time = e.orderDateTime.split(' ')[1]
                e.showTime = `${date.getMonth() +
                1}月${date.getDate()}日 ${time}`
              } else {
                e.showTime = ''
              }
              if (e.receiveDateTime) {
                const date = new Date(e.receiveDateTime)
                const dateStr = Format(date, 'yyyy-MM-dd HH:mm:ss')
                e.showReceiveDateTime = `${date.getMonth()}月${date.getDay()}日 ${
                  dateStr.split(' ')[1]
                }`
              } else {
                e.showReceiveDateTime = ''
              }
              return e
            })
            this.orderList = datas
            this.total = count
          })
          .catch(error => {
            console.log(error)
          })
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.currentPage = 1
        this.search()
      },
      handleCurrentChange(page) {
        this.currentPage = page
        this.search()
      },
      showDetail(data) {
      },
      editOrder() {
      },
      deleteOrder() {
      },
      /**
       * 弹框确认是否完成
       */
      confirmFinishOrder(index, row) {
        this.$confirm('是否确认完成该订单？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.finishOrder(index, row)
          })
          .catch(() => {
          })
      },
      finishOrder(index, row) {
        finishOrder({ id: row.id }).then(data => {
          if (data.status === '已完成') {
            this.orderList[index].status = '已完成'
            this.setUnfinishedOrders(this.unfinishedOrders - 1)
            this.$message({
              message: '手动完成订单成功',
              type: 'success'
            })
          } else {
            this.$message.error('出现异常，请联系开发人员')
          }
        })
      },
      getAllShop() {
        getShopsByRole().then(data => {
          this.shops = data || []
          this.shops.length > 0 && (this.form.shopCode = this.shops[0].code)
        })
      },
      showUnfinisnedOrderList() {
        this.form = {
          status: '已付款'
        }
        this.selectDate = null
        this.search()
      }
    }
  }
</script>

<style lang="scss" scoped src="./OrderList.scss"></style>

