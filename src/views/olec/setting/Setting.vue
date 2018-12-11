<!--
Description 配置页面
@authors Your Name (you@example.org)
@date    2018-09-02 13:24:59
@version 1.0.0
  修改备注： deliveryRange 现在表示配送距离  2018/10/24
-->
<template>
  <div
    id="setting"
    class="wi-container"
  >
    <div class="searchPane">
      <div class="row">
        <el-select
          style="width:200px;"
          size="mini"
          v-model="searchParams.shopCode"
          placeholder="请选择店铺"
          clearable
          @change="changeShop"
        >
          <el-option
            v-for="item in shops"
            :key="item.name"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
        <!-- <el-switch v-if="shops.length>0&&shops[shopIndex]" v-model="deliveryRange" active-text="开启外送" inactive-text="关闭外送" @change="changeSwitch">
				</el-switch> -->
        <div class="delivery-input">
          配送距离：
          <!-- <el-input size="mini" v-model="deliveryRange" placeholder="请输入配送距离" style="width:200px"></el-input> -->
          <el-input-number
            v-model="deliveryRange"
            @change="handleChangeDistance"
            :min="0"
            :max="20000"
            label="请输入配送距离"
          ></el-input-number>
          米
        </div>
      </div>

      <div class="row">
        <el-input
          style="max-width:200px;"
          size="mini"
          v-model="searchParams.goodsName"
          placeholder="请输入商品名称"
        ></el-input>
        <el-button
          size="mini"
          type="primary"
          @click="search"
        >查询</el-button>
      </div>

    </div>
    <div class="table-wrapper">
      <el-table
        :data="goodsList"
        size="small"
        highlight-current-row
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="id"
          label="id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="logo"
        >
          <template slot-scope="scope">
            <div
              class="img-wrapper"
              v-viewer
            >
              <img
                src="http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7aec54e736d12f2edb0abb094fc2d5628535684f.jpg"
                alt=""
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="商品状态"
        >
          <template slot-scope="scope">
            <span :class="{'greenTip':scope.row.status==='在售','redTip':scope.row.status!=='在售'}">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="上下线配置"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.status === '在售'"
              type="primary"
              @click="changeGoodsStatus(scope.$index, scope.row)"
            >下线</el-button>
            <el-button
              size="mini"
              v-else
              type="primary"
              @click="changeGoodsStatus(scope.$index, scope.row)"
            >上线</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="图片"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="uploadImg(scope.$index, scope.row)"
            >修改图片</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-show="total>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div class="vue-cropper-wrapper">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :info="option.info"
        :canScale="option.canScale"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
      >
      </vueCropper>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

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
        olddeliveryRange: 0, // 备份上一次配送距离，用于修改失败时恢复
        deliveryRange: 0,

        // 图片裁剪
        option: {
          img: '', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'jpeg', // 裁剪生成图片的格式
          canScale: false, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 150, // 默认生成截图框宽度
          autoCropHeight: 150, // 默认生成截图框高度
          fixed: false, // 是否开启截图框宽高固定比例
          fixedNumber: [4, 4] // 截图框的宽高比例
        },
        dialogVisible: false
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
          this.shops.length > 0 &&
            (this.searchParams.shopCode = this.shops[0].code)
          this.deliveryRange = this.shops[0].deliveryRange
          this.olddeliveryRange = this.deliveryRange
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
        this.deliveryRange = shop.deliveryRange
      },
      /**
       * 修改配送范围
       */
      handleChangeDistance(distance) {
        const text = distance === 0 ? `[${this.shops[this.shopIndex].name}] 关闭外送` : `[${this.shops[this.shopIndex].name}] 外送距离设置为${distance}米`
        this.$confirm(text, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.updateShop(distance)
          })
          .catch(() => {
            this.deliveryRange = this.olddeliveryRange
          })
      },
      updateShop(deliveryRange) {
        let shopindex
        const shop = this.shops.find((e, index) => {
          if (e.code === this.searchParams.shopCode) {
            shopindex = index
            return true
          }
          return false
        })
        updateShop(shop.id, { deliveryRange })
          .then(res => {
            this.$message.success('修改店铺外送属性成功')
            shopindex != null &&
              (this.shops[shopindex].deliveryRange = deliveryRange)
          })
          .catch(e => {
            console.log(e)
            this.$message.error('网站出错，请联系开发人员')
          })
      },
      changeGoodsStatus(index, row) {
        let msg = ''
        msg =
          row.status === '在售'
            ? `是否确定设置${row.name}“售罄” `
            : `是否确定设置${row.name}“在售”`
        this.$confirm(msg, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.updateGoods(index, row)
          })
          .catch(() => { })
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
      },
      uploadImg(index, row) {
        this.option.img = 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7aec54e736d12f2edb0abb094fc2d5628535684f.jpg'
        this.dialogVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped src="./Setting.scss">
</style>
