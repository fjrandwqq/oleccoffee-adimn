<!--
Description 配置页面
@authors Your Name (you@example.org)
@date    2018-09-02 13:24:59
@version 1.0.0
-->
<template>
	<div id="setting">
		<div class="searchPane">
			<div class="row">
				<el-select style="width:200px;" size="mini" v-model="searchParams.shopCode" placeholder="请选择店铺" clearable @change="changeShop">
					<el-option v-for="item in shops" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<el-switch v-if="shops.length>0&&shops[shopIndex]" v-model="canDelivery" active-text="开启外送" inactive-text="关闭外送" @change="changeSwitch">
				</el-switch>
			</div>
			<div class="row">
				<el-input style="max-width:200px;" size="mini" v-model="searchParams.goodsName" placeholder="请输入商品名称"></el-input>
				<el-button size="mini" type="primary" @click="search">查询</el-button>
			</div>

		</div>
		<div class="table-wrapper">
			<el-table :data="goodsList" size="small" highlight-current-row border stripe style="width: 100%">
				<el-table-column align="center" prop="id" label="id" width="180">
				</el-table-column>
				<el-table-column align="center" prop="name" label="商品名称">
				</el-table-column>
				<el-table-column align="center" prop="status" label="商品状态">
					<template slot-scope="scope">
						<span :class="{'greenTip':scope.row.status==='在售','redTip':scope.row.status!=='在售'}">{{scope.row.status}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="管理操作">
					<template slot-scope="scope">
						<el-button size="mini" v-if="scope.row.status === '在售'" type="primary" @click="changeGoodsStatus(scope.$index, scope.row)">下线</el-button>
						<el-button size="mini" v-else type="primary" @click="changeGoodsStatus(scope.$index, scope.row)">上线</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-pagination v-show="total>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>
<script>
import { getShopsByRole } from '@/api/order'

import { getGoods, updateShop, updateGoods } from '@/api/setting'
export default {
  data() {
    return {
      searchParams: {
        shopCode: '',
        goodsName: ''
      },
      goodsList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      shops: [],
      shopIndex: 0,
      canDelivery: true
    }
  },
  mounted() {
    this.getAllShop().then(() => {
      this.search()
    })

    this.$root.$on('showUnfinisnedOrderList', this.showUnfinisnedOrderList)
  },
  methods: {
    getAllShop() {
      return getShopsByRole().then(data => {
        this.shops = data || []
        this.shops.length > 0 && (this.searchParams.shopCode = this.shops[0].code)
        this.canDelivery = this.shops[0].canDelivery
      })
    },
    search() {
      const params = {}
      params.shopCode = this.searchParams.shopCode
      params.start = (this.currentPage - 1) * this.pageSize
      params.length = this.pageSize
      // params.status = '在售'
      params.goodsName = this.searchParams.goodsName
      getGoods(params)
        .then(data => {
          this.goodsList = data.datas
          this.total = data.count
        })
        .catch(e => {
          console.log(e)
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
    changeShop(code) {
      const shop = this.shops.find((e, index) => {
        if (e.code === code) {
          this.shopIndex = index
          return true
        }
        return false
      })
      this.canDelivery = shop.canDelivery
      console.log(this.canDelivery)
    },
    changeSwitch(canDelivery) {
      let msg = ''
      if (canDelivery) {
        msg = `${this.shops[this.shopIndex].name} 开启外送?`
      } else {
        msg = `${this.shops[this.shopIndex].name} 关闭外送?`
      }
      this.$confirm(msg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.updateShop(canDelivery)
        })
        .catch(() => {
          this.canDelivery = !this.canDelivery
        })
    },
    updateShop(canDelivery) {
      const shop = this.shops.find(e => {
        return e.code === this.searchParams.shopCode
      })
      updateShop(shop.id, { canDelivery })
        .then(res => {
          this.$message.success('修改店铺是否外送属性成功')
        })
        .catch(e => {
          console.log(e)
          this.$message.error('网站出错，请联系开发人员')
        })
    },
    changeGoodsStatus(index, row) {
      let msg = ''
      msg = row.status === '在售' ? `是否确定设置${row.name}“售罄” ` : `是否确定设置${row.name}“在售”`
      this.$confirm(msg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.updateGoods(index, row)
        })
        .catch(() => {})
    },
    updateGoods(index, row) {
      const status = row.status === '在售' ? '售罄' : '在售'
      updateGoods(row.id, { status })
        .then(res => {
          this.goodsList[index].status = res.status
        })
        .catch(e => {
          console.log(e)
          this.$message.error('网站出错，请联系开发人员')
        })
    }
  }
}
</script>

<style lang="scss" scoped src="./Setting.scss">
</style>
