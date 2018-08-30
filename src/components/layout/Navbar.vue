<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="right-nav">
      <div class="notice-wrapper">
        <el-badge v-if="unfinishedOrders>0" :value="unfinishedOrders" class="item" @click.native.stop="refreshOrderList">
          <img class="notice starFlick" src="@/images/notice.png" />
        </el-badge>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <!-- <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link> divided -->
          <el-dropdown-item>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        // 'avatar',
        'unfinishedOrders'
      ])
    },
    mounted() {
      this.getUnfinishedOrders()
      // 临时方案，10秒钟获取一次未完成订单
      setInterval(() => {
        this.getUnfinishedOrders()
      }, 15 * 1000)
    },
    data() {
      return {
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533460636268&di=7ab5a5d530f3fb6d2c505415222fe58b&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fd52a2834349b033bda94010519ce36d3d439bdd5.jpg'
      }
    },
    methods: {
      ...mapActions([
        'getUnfinishedOrders'
      ]),
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      refreshOrderList() {
        this.$root.$emit('showUnfinisnedOrderList')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .right-nav {
      position: absolute;
      right: 35px;
      height: 50px;
      top: 0;
      .notice-wrapper {
        height: 50px;
        display: inline-block;
        margin-right: 30px;
        cursor: pointer;
      }
      .avatar-container {
        height: 50px;
        display: inline-block;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .starFlick {
    animation: starFlick 0.8s ease-out infinite;
    -webkit-animation: starFlick 0.8s ease-out infinite;
  }

  @keyframes starFlick {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>

