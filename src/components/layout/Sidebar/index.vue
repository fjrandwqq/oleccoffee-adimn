<template>
  <div class="side-bar">
    <div :class="{'sys-header':true,'sys-header-collapse':isCollapse,'sys-header-uncollapse':!isCollapse}">
      <a>
        <template v-if="!isCollapse">
          <img class="logo" :title="title" :src="logo" />
          <!-- <span class="title">{{title}}</span> -->
        </template>
        <template v-else>
          <img class="logo" :title="title" :src="logoFold" />
        </template>
      </a>
    </div>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
        <sidebar-item :routes="permission_routers"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { sysInfo } from '@/config/global'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      logo: sysInfo.logo,
      logoFold: sysInfo.logoFold,
      title: sysInfo.title
    }
  }
}
</script>
