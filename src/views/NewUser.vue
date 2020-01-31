<template>
  <div>
    <div style="text-align: center;">
      <div style="display: inline;">
        <van-image
          round
          width="100px"
          height="100px"
          :src="$store.state.userInfo.userIcon">
        </van-image>
        <br>
        <span style="font-weight: 700">
          你好，{{$store.state.userInfo.userName}}
        </span>
        <br>
        <span>
          请完善用户信息
        </span>
      </div>
    </div>
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
