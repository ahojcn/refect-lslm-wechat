<template>
  <div>
    <van-row>
      <van-col span="6"></van-col>
      <van-col span="12">
        <van-button size="large" block color="linear-gradient(to right, #70e1f5, #ffd194)" to="/NewUser/Student">
          学生认证
        </van-button>
        <br>
        <br>
        <van-button size="large" block color="linear-gradient(to right,  #eecda3, #ef629f)" to="/NewUser/Company">
          企业认证
        </van-button>
        <br>
        <br>
        <van-button size="large" block color="linear-gradient(to right,  #4bb0ff, #6149f6)" to="/NewUser/Club">
          学生社团认证
        </van-button>
      </van-col>
      <van-col span="6"></van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "Index"
  }
</script>

<style scoped>

</style>
