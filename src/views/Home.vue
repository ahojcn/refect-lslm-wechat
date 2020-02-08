<template>
  <div>
    <div style="text-align: center; padding-top: 10%">
      <div style="display: inline;">
        <van-image
          round
          width="100px"
          height="100px"
          style="background-color: transparent;box-shadow:0 0 8px 5px #ccc;"
          :src="$store.state.userInfo.userIcon">
        </van-image>
        <br>

        <van-tag v-if="Object.keys($store.state.studentInfo).length !== 0" type="primary">学生用户</van-tag>
        <van-tag v-if="Object.keys($store.state.companyInfo).length !== 0" type="success">企业用户</van-tag>
        <van-tag v-if="Object.keys($store.state.clubInfo).length !== 0" type="warning">学生社团用户</van-tag>
      </div>
    </div>

    <div>
      <div>
        <van-divider content-position="left"
                     :style="{ color: '#ff976a', borderColor: '#ff976a'}">
          个人信息
        </van-divider>
        <van-grid :column-num="4" :gutter="1">
          <van-grid-item icon="edit" text="我的简历" to="/NewUser/Resume"></van-grid-item>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
          <van-grid-item icon="photo-o" text="文字"></van-grid-item>
          <van-grid-item icon="award-o" text="身份认证" to="/NewUser/Index"></van-grid-item>
        </van-grid>
      </div>

      <div>
        <van-divider content-position="left"
                     :style="{ color: '#1989fa', borderColor: '#1989fa'}">
          品牌活动
        </van-divider>
        <van-cell title="URL 跳转" is-link></van-cell>
        <van-cell title="路由跳转" is-link></van-cell>
      </div>

      <div>
        <van-divider content-position="left"
                     :style="{ color: '#07c160', borderColor: '#07c160'}">
          兼职广场
        </van-divider>
        <van-cell title="URL 跳转" is-link></van-cell>
        <van-cell title="路由跳转" is-link></van-cell>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {}
    },
  }
</script>

<style scoped>

</style>
