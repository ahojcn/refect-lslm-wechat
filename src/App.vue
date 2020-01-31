<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/basic-info';

  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {
      getUserInfo({openId: this.$route.query["openId"]}).then(res => {
        res = res.data;
        let state = this.$store.state;
        state.userInfo = res.userInfo;
        state.clubInfo = res.clubInfo;
        state.companyInfo = res.companyInfo;
        state.studentInfo = res.studentInfo;

        // 判断是否是新用户
        if (Object.keys(res.clubInfo).length === 0
          || Object.keys(res.companyInfo).length === 0
          || Object.keys(res.studentInfo).length === 0) {
          state.isNewUser = true;
          this.$router.push({
            path: '/NewUserIndex',
            query: {
              openId: this.$route.query["openId"]
            }
          });
        }

      });
    },
    created() {
    },
  }
</script>

<style>
  #app {
    background: #f1f1fe;
    position: relative;
    border-radius: 10px;
    overflow: scroll;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
