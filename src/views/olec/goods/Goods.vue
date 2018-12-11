<!--
Description 商品的操作
@authors fanjiongrong (fanjiongrong@tvflnet.com)
@date    2018-12-11 18:50:30
@version 1.0.0
-->
<template>
  <div class="wi-content">
    <el-row>
      <el-col :md="6">
        <ul class="kind-list">
          <li v-for="(item,index) in kindList">
            <div class="text">{{`${item.name}(${item.goodsNum})`}}</div>
            <div class="btns">
              <i
                class="el-icon-edit"
                @click=""
              ></i>
              <i
                class="el-icon-delete"
                @click=""
              ></i>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :md="18">
        <el-table
          :data="orderList"
          highlight-current-row
          border
          stripe
          style="width: 100%;margin-left:24px;"
        >
          <el-table-column
            align="center"
            prop="code"
            label="商品"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="userName"
            label="分类"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="userMobile"
            label="编码"
            width="120"
          >
          </el-table-column>
           <el-table-column
            align="center"
            prop="userMobile"
            label="编码"
            width="120"
          >
          </el-table-column>
           <el-table-column
            align="center"
            prop="userMobile"
            label="编码"
            width="120"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="goods">

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        kindList: [{
          id: 1,
          name: '经典热咖啡系列',
          goodsNum: 8
        }, {
          id: 2,
          name: '经典冰咖啡系列',
          goodsNum: 4
        }, {
          id: 3,
          name: '热饮系列',
          goodsNum: 3
        }, {
          id: 4,
          name: '自拍咖啡系列',
          goodsNum: 8
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wi-content {
    padding: 24px;
    ul.kind-list {
      border: 1px solid rgba(221, 221, 221, 0.78);
      border-radius: 4px;
      li {
        display: flex;
        padding: 5px 10px;
        border-bottom: 1px solid rgba(221, 221, 221, 0.78);
        .text {
          flex: 1;
          flex-shrink: 0;
        }
      }
    }
  }
</style>
