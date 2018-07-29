<!--
Description
@authors Your Name (you@example.org)
@date    2018-07-29 19:56:23
@version 1.0.0
-->
<template>
    <div id="order-list">
        <div class="search-panel">
            <el-input class="search-input" placeholder="请输入id,订单号或者店铺名" prefix-icon="el-icon-search" v-model="mix">
            </el-input>
            <el-button type="primary">展开高级筛选</el-button>
        </div>
        <div class="ol-table">
            <el-table :data="orderListData" stripe style="width: 100%">
                <el-table-column prop="id" label="id" width="180">
                </el-table-column>
                <el-table-column prop="code" label="订单号" width="180">
                </el-table-column>
                <el-table-column prop="shopName" label="店铺" width="180">
                </el-table-column>
                <el-table-column prop="user" label="用户">
                </el-table-column>
                <el-table-column prop="status" label="支付状态">
                </el-table-column>
                <el-table-column prop="total" label="总价">
                </el-table-column>
                <el-table-column prop="payForm" label="支付方式">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="single-btn" @click="handleDetail(scope.$index, scope.row)">查看</span>
                        <el-dropdown>
                            <span class="el-dropdown-link more-btn">
                                更多
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu  slot="dropdown">
                                <el-dropdown-item>修改</el-dropdown-item>
                                <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      mix: '',
      orderListData: [
        {
          id: 1,
          code: 'advadffaf123123',
          shopName: '天河欧蕾克',
          status: '未支付',
          total: 100,
          payForm: '微信'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped src="./OrderList.scss"></style>

