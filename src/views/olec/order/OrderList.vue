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
                <el-input v-model="form.shopCode" placeholder="请输入店铺编号"></el-input>
            </el-form-item>
            <el-form-item label="订单编号">
                <el-input v-model="form.orderCode" placeholder="请输入订单编号"></el-input>
            </el-form-item>
            <el-form-item label="收货地址">
                <el-input v-model="form.userAddress" placeholder="请输入收货地址"></el-input>
            </el-form-item>
            <el-form-item label="收货电话">
                <el-input v-model="form.userMobile" placeholder="请输入收货电话"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option v-for="item in statusList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="配送方式">
                <el-select v-model="form.receiveType" placeholder="请选择">
                    <el-option v-for="item in receiveTypeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="下单时间">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="dateRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="ol-table" ref="tableWrapper">
            <el-table :data="orderList" size="small" highlight-current-row border stripe style="width: 100%">
                <el-table-column align="center" prop="code" label="订单号" width="180">
                </el-table-column>
                <el-table-column align="center" prop="userMobile" label="收货电话" width="120">
                </el-table-column>
                <el-table-column align="center" prop="userName" label="收货人" width="100">
                </el-table-column>
                <el-table-column align="center" prop="userAddress" label="收货地址">
                </el-table-column>
                <el-table-column align="center" prop="status" label="支付状态" width="100">
                </el-table-column>
                <el-table-column align="center" prop="orderDateTime" label="下单时间">
                </el-table-column>
                <el-table-column align="center" prop="realTotalMoney" label="总价" width="100">
                </el-table-column>
                <el-table-column align="center" prop="receiveType" label="配送方式" width="100">
                </el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="single-btn" @click="showDetail(scope.row)">查看</span>
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
                        </el-dropdown>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { getOrder } from '@/api/order'
export default {
  data() {
    return {
      receiveTypeList: ['全部', '送货上门', '自提'],
      statusList: ['全部', '确认收货', '待发货', '配送中', '未付款', '用户取消', '用户拒收'],
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
        start: 1,
        length: 10
      }
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      this.$refs.tableWrapper.scrollTop = 0
      if (this.form.status === '全部') {
        this.form.status = ''
      }
      if (this.form.receiveType === '全部') {
        this.form.receiveType = ''
      }
      this.form.orderStartDateTime = this.dateRange && this.dateRange[0] || ''
      this.form.orderEndDateTime = this.dateRange && this.dateRange[1] || ''
      this.form.start = (this.currentPage - 1) * this.pageSize + 1
      this.form.length = this.pageSize
      this.getOrderList()
    },
    getOrderList() {
      getOrder(this.form).then(({ data }) => {
        const { datas = [], count = 0 } = data || {}
        this.orderList = datas
        this.total = count
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

    }
  }

}
</script>

<style lang="scss" scoped src="./OrderList.scss"></style>

