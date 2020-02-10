<template>
  <div>
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <router-view></router-view>
    </transition>

    <div style="padding-top: 100px">
      <van-tabbar v-model="$store.state.activeTabBar">
        <van-tabbar-item name="PartTimeJob" icon="like" to="/PartTimeJob">
          兼职广场
        </van-tabbar-item>
        <van-tabbar-item name="ActiveCenter" icon="star">
          活动中心
        </van-tabbar-item>
        <van-tabbar-item name="Home" icon="wap-home" to="/Home">
          个人中心
        </van-tabbar-item>
      </van-tabbar>
    </div>
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
