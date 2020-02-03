<template>
  <div>
    <div style="text-align: center; padding-top: 10%">
      <div style="display: inline;">
        <van-image
          round
          width="100px"
          height="100px"
          :src="$store.state.userInfo.userIcon">
        </van-image>
        <br>
        <span style="font-weight: 700;">
          Hi {{$store.state.userInfo.userName}}
        </span>
      </div>
    </div>

    <br>
    <br>
    <van-row>
      <van-col span="1"></van-col>
      <van-col span="22">
        <transition mode="out-in"
                    enter-active-class="animated fadeInRight"
                    leave-active-class="animated fadeOutLeft"
        >
          <router-view></router-view>
        </transition>
      </van-col>
      <van-col span="1"></van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "NewUser",
    data() {
      return {}
    },
    methods: {},
    mounted() {
    },
    created() {
    },
  }
</script>

<style scoped>

</style>
