<template>
  <div>
    <van-notice-bar
      text="功能开发、测试阶段，请勿使用！面对疫情：勤洗手、多通风、带好口罩！功能开发、测试阶段，请勿使用！不传谣、不信谣，打赢防疫战！功能开发、测试阶段，请勿使用！"
      left-icon="volume-o"
      mode="closeable"
      background="#ecf9ff"
      color="#1989fa">
    </van-notice-bar>

    <transition mode="out-in"
                enter-active-class="animated fadeInDown"
                leave-active-class="animated fadeOutDown"
    >
      <router-view></router-view>
    </transition>

    <van-tabbar v-model="$store.state.activeTabBar">
      <van-tabbar-item name="PartTimeJob" icon="home-o">
        兼职广场
      </van-tabbar-item>
      <van-tabbar-item name="ActiveCenter" icon="search">
        活动中心
      </van-tabbar-item>
      <van-tabbar-item name="SelfCenter" icon="friends-o">
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {}
    },
    methods: {},
    mounted() {
      this.$store.commit('setActiveTabBar', 'PartTimeJob');
    },
  }
</script>

<style scoped>

</style>
